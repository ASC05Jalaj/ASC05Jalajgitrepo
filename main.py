from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from hccpy.hcc import HCCEngine
import traceback
import os

PORT = int(os.environ.get("PORT", 5000))

app = FastAPI()

# Enable CORS for frontend communication
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Initialize HCC engine with CMS-HCC V28 model
hcc_engine = HCCEngine("28")

# Define request models
class RiskScoreRequest(BaseModel):
    diagnosis_codes: list[str]
    gender: str
    age: int
    eligibility: str

class DemographicRiskScoreRequest(BaseModel):
    age: int
    gender: str
    eligibility: str

@app.post("/api/comprehensive-risk-score")
async def calculate_comprehensive_risk_score(data: RiskScoreRequest):
    gender = data.gender.lower()

    try:
        # Step 1: Demographic-only profile
        demographic_profile = {
            "dx_lst": [],
            "age": data.age,
            "sex": "M" if gender == "male" else "F",
            "elig": data.eligibility
        }
        demographic_risk_profile = hcc_engine.profile(**demographic_profile)
        demographic_risk_score = demographic_risk_profile["risk_score"]

        results = []

        # Step 2: Process each diagnosis code
        for diagnosis_code in data.diagnosis_codes:
            diagnosis_profile = {
                "dx_lst": [diagnosis_code],
                "age": data.age,
                "sex": "M" if gender == "male" else "F",
                "elig": data.eligibility
            }

            total_risk_profile = hcc_engine.profile(**diagnosis_profile)
            total_risk_score = total_risk_profile["risk_score"]
            diagnosis_risk_score = max(total_risk_score - demographic_risk_score, 0)

            hcc_map = total_risk_profile.get("hcc_map", {})
            details = total_risk_profile.get("details", {})

            if diagnosis_code in hcc_map:
                hcc_codes = hcc_map[diagnosis_code] if isinstance(hcc_map[diagnosis_code], list) else [hcc_map[diagnosis_code]]

                for hcc_code in hcc_codes:
                    try:
                        hcc_description = hcc_engine.describe_hcc(hcc_code)
                        hcc_desc = hcc_description.get("description", "No description available")

                        hcc_specific_key = f"{data.eligibility}_HCC{hcc_code.replace('HCC', '')}"
                        hcc_specific_score = details.get(hcc_specific_key, 0)

                        results.append({
                            "DIAG": diagnosis_code,
                            "SEX": gender.capitalize(),
                            "Age": data.age,
                            "Eligibility": data.eligibility,
                            "Risk_Score": round(hcc_specific_score, 3),
                            "HCC_Code": hcc_code,
                            "HCC_Description": hcc_desc
                        })
                    except Exception as e:
                        results.append({
                            "DIAG": diagnosis_code,
                            "SEX": gender.capitalize(),
                            "Age": data.age,
                            "Eligibility": data.eligibility,
                            "Risk_Score": 0,
                            "HCC_Code": hcc_code,
                            "HCC_Description": f"Error fetching description: {str(e)}"
                        })
            else:
                results.append({
                    "DIAG": diagnosis_code,
                    "SEX": gender.capitalize(),
                    "Age": data.age,
                    "Eligibility": data.eligibility,
                    "Risk_Score": 0,
                    "HCC_Code": "N/A",
                    "HCC_Description": "No HCC code mapped"
                })

        # Step 3: Calculate total risk score (sum of all individual HCC scores)
        total_score = sum(item["Risk_Score"] for item in results)

        return {
            "demographic_score": round(demographic_risk_score, 3),
            "total_risk_score": round(total_score, 3),
            "results": results
        }

    except Exception as e:
        traceback.print_exc()
        raise HTTPException(status_code=500, detail=str(e))

@app.post("/api/comprehensive-risk-score-with-totals")
async def calculate_comprehensive_risk_score_with_totals(data: RiskScoreRequest):
    gender = data.gender.lower()

    try:
        # Step 1: Calculate demographic risk score
        demographic_profile = {
            "dx_lst": [],
            "age": data.age,
            "sex": "M" if gender == "male" else "F",
            "elig": data.eligibility
        }
        demographic_risk_profile = hcc_engine.profile(**demographic_profile)
        demographic_risk_score = demographic_risk_profile["risk_score"]

        # Step 2: Calculate total risk score with all diagnoses included (HCC model approach)
        full_profile = {
            "dx_lst": data.diagnosis_codes,
            "age": data.age,
            "sex": "M" if gender == "male" else "F",
            "elig": data.eligibility
        }
        
        full_risk_profile = hcc_engine.profile(**full_profile)
        hcc_model_total_risk_score = full_risk_profile["risk_score"]
        
        # Step 3: Calculate diagnosis-only risk score (total minus demographic)
        hcc_model_diagnosis_risk_score = max(hcc_model_total_risk_score - demographic_risk_score, 0)

        # Step 4: Process individual diagnosis results (your existing logic)
        results = []
        for diagnosis_code in data.diagnosis_codes:
            diagnosis_profile = {
                "dx_lst": [diagnosis_code],
                "age": data.age,
                "sex": "M" if gender == "male" else "F",
                "elig": data.eligibility
            }

            total_risk_profile = hcc_engine.profile(**diagnosis_profile)
            total_risk_score = total_risk_profile["risk_score"]
            diagnosis_risk_score = max(total_risk_score - demographic_risk_score, 0)

            hcc_map = total_risk_profile.get("hcc_map", {})
            details = total_risk_profile.get("details", {})

            if diagnosis_code in hcc_map:
                hcc_codes = hcc_map[diagnosis_code] if isinstance(hcc_map[diagnosis_code], list) else [hcc_map[diagnosis_code]]

                for hcc_code in hcc_codes:
                    try:
                        hcc_description = hcc_engine.describe_hcc(hcc_code)
                        hcc_desc = hcc_description.get("description", "No description available")

                        hcc_specific_key = f"{data.eligibility}_HCC{hcc_code.replace('HCC', '')}"
                        hcc_specific_score = details.get(hcc_specific_key, 0)

                        results.append({
                            "DIAG": diagnosis_code,
                            "SEX": gender.capitalize(),
                            "Age": data.age,
                            "Eligibility": data.eligibility,
                            "Risk_Score": round(hcc_specific_score, 3),
                            "HCC_Code": hcc_code,
                            "HCC_Description": hcc_desc
                        })
                    except Exception as e:
                        results.append({
                            "DIAG": diagnosis_code,
                            "SEX": gender.capitalize(),
                            "Age": data.age,
                            "Eligibility": data.eligibility,
                            "Risk_Score": 0,
                            "HCC_Code": hcc_code,
                            "HCC_Description": f"Error fetching description: {str(e)}"
                        })
            else:
                results.append({
                    "DIAG": diagnosis_code,
                    "SEX": gender.capitalize(),
                    "Age": data.age,
                    "Eligibility": data.eligibility,
                    "Risk_Score": 0,
                    "HCC_Code": "N/A",
                    "HCC_Description": "No HCC code mapped"
                })

        # Step 5: Calculate sum of individual HCC scores for comparison
        sum_of_individual_scores = sum(item["Risk_Score"] for item in results) + demographic_risk_score
        
        # Step 6: Add explanation about the difference in calculation methods
        calculation_explanation = {
            "sum_of_individual_scores": round(sum_of_individual_scores, 3),
            "hcc_model_total_score": round(hcc_model_total_risk_score, 3),
            "hcc_model_diagnosis_score": round(hcc_model_diagnosis_risk_score, 3),
            "explanation": "The HCC model score differs from the sum of individual diagnosis scores because the HCC model accounts for hierarchical relationships and interactions between diagnoses."
        }

        return {
            "demographic_score": round(demographic_risk_score, 3),
            "individual_diagnosis_total": round(sum(item["Risk_Score"] for item in results), 3),
            "hcc_model_total_risk_score": round(hcc_model_total_risk_score, 3),
            "hcc_model_diagnosis_risk_score": round(hcc_model_diagnosis_risk_score, 3),
            "calculation_details": calculation_explanation,
            "results": results
        }

    except Exception as e:
        traceback.print_exc()
        raise HTTPException(status_code=500, detail=str(e))

@app.post("/api/demographic-score")
async def calculate_demographic_score(data: DemographicRiskScoreRequest):
    try:
        profile = {
            "dx_lst": [],
            "age": data.age,
            "sex": "M" if data.gender.lower() == "male" else "F",
            "elig": data.eligibility
        }

        risk_profile = hcc_engine.profile(**profile)
        demographic_risk_score = risk_profile["risk_score"]

        return {
            "demographic_score": round(demographic_risk_score, 3)
        }

    except Exception as e:
        traceback.print_exc()
        raise HTTPException(status_code=500, detail=str(e))

@app.get("/")
async def root():
    return {"message": "HCC Risk Score API is running", "status": "healthy"}

@app.get("/health")
async def health_check():
    return {"status": "healthy", "service": "HCC Risk Score API"}


if __name__ == "__main__":
    import uvicorn
    print(f"🚀 FastAPI Risk Score API is running on port {PORT}")
    uvicorn.run(app, host="0.0.0.0", port=PORT)