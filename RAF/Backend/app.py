from flask import Flask, request, jsonify
from flask_cors import CORS
from hccpy.hcc import HCCEngine
import pandas as pd
 
app = Flask(__name__)
CORS(app)
 
# Initialize HCC Engines for different versions
hcc_engines = {
    "CMS-HCC V22": HCCEngine("22"),
    "CMS-HCC V23": HCCEngine("23"),
    "CMS-HCC V24": HCCEngine("24"),
    "CMS-HCC V28": HCCEngine("28"),
}
 
# Load ICD-10 descriptions from CSV
icd10_descriptions = {}
 
def load_icd10_descriptions():
    global icd10_descriptions
    try:
        df = pd.read_csv("./data/ICD10codes.csv", dtype=str)  # Ensure all columns are strings
        if 'DIAG' in df.columns and 'Description' in df.columns:
            icd10_descriptions = dict(zip(df['DIAG'], df['Description']))
        else:
            print("CSV file missing required columns: 'DIAG' and 'Description'")
    except Exception as e:
        print(f"Error loading ICD-10 descriptions: {e}")
 
# Load descriptions at startup
load_icd10_descriptions()
 
@app.route('/api/risk-score', methods=['POST'])
def calculate_risk_score():
    data = request.get_json()
 
    diagnosis_codes = data.get('diagnosis_code', '').split(',')
    gender = data.get('gender', '').lower()
    age = data.get('age', '')
    eligibility = data.get('eligibility', '')
    model_name = data.get('model_name', 'CMS-HCC V28')
 
    if not diagnosis_codes or not gender or not age or not eligibility or not model_name:
        return jsonify({"error": "All fields are required"}), 400
 
    if model_name not in hcc_engines:
        return jsonify({"error": f"Model {model_name} is not supported"}), 400
 
    try:
        hcc_engine = hcc_engines[model_name]
 
        profile = {
            "dx_lst": diagnosis_codes,
            "age": int(age),
            "sex": "M" if gender == "male" else "F",
            "elig": eligibility
        }
 
        risk_profile = hcc_engine.profile(**profile)
 
        risk_score = risk_profile['risk_score']
        hcc_map = risk_profile.get('hcc_map', {})
 
        results = []
        for diagnosis_code in diagnosis_codes:
            icd_description = icd10_descriptions.get(diagnosis_code, "No description available")
 
            if diagnosis_code in hcc_map:
                hcc_codes = hcc_map[diagnosis_code]
                if not isinstance(hcc_codes, list):
                    hcc_codes = [hcc_codes]
 
                for hcc_code in hcc_codes:
                    try:
                        hcc_description = hcc_engine.describe_hcc(hcc_code)
                        hcc_desc = hcc_description['description']
                    except Exception as e:
                        hcc_desc = f"Error fetching description: {str(e)}"
 
                    risk_score_detail = {
                        "DIAG": diagnosis_code,
                        "SEX": gender.capitalize(),
                        "ICD_Description": icd_description,
                        "Age": age,
                        "Eligibility": eligibility,
                        "Risk_Score": round(risk_score, 3),
                        "HCC_Code": hcc_code,
                        "HCC_Description": hcc_desc
                    }
                    results.append(risk_score_detail)
            else:
                results.append({
                    "DIAG": diagnosis_code,
                    "SEX": gender.capitalize(),
                    "ICD_Description": icd_description,
                    "Age": age,
                    "Eligibility": eligibility,
                    "Risk_Score": 0,
                    "HCC_Code": "N/A",
                    "HCC_Description": "No HCC code mapped"
                })
 
        return jsonify(results), 200
 
    except Exception as e:
        return jsonify({"error": str(e)}), 500
 
@app.route('/api/demographic-risk-score', methods=['POST'])
def calculate_demographic_risk_score():
    data = request.get_json()
 
    age = data.get('age', '')
    gender = data.get('gender', '').lower()
    eligibility = data.get('eligibility', '')
    model_name = data.get('model_name', 'CMS-HCC V28')
 
    if not age or not gender or not eligibility or not model_name:
        return jsonify({"error": "All fields are required"}), 400
 
    if model_name not in hcc_engines:
        return jsonify({"error": f"Model {model_name} is not supported"}), 400
 
    try:
        hcc_engine = hcc_engines[model_name]
 
        profile = {
            "dx_lst": [],
            "age": int(age),
            "sex": "M" if gender == "male" else "F",
            "elig": eligibility
        }
 
        risk_profile = hcc_engine.profile(**profile)
 
        demographic_risk_score = risk_profile["risk_score"]
 
        return jsonify({
            "demographicRiskFactor": round(demographic_risk_score, 3),
            "model_name": model_name
        }), 200
 
    except Exception as e:
        return jsonify({"error": str(e)}), 500
 
# New endpoint to handle ICD-10 code suggestions
@app.route('/api/icd-suggestions', methods=['GET'])
def icd_suggestions():
    query = request.args.get('query', '')
   
    if not query:
        return jsonify({"error": "Query parameter is required"}), 400

    suggestions = []
    
    try:
        # Search for matching ICD-10 codes in the pre-loaded descriptions dataset
        for code in icd10_descriptions.keys():
            # Check if the query matches the code (case-insensitive)
            if query.lower() in code.lower():
                suggestions.append({"code": code})

    except Exception as e:
        return jsonify({"error": f"Error fetching ICD-10 suggestions: {str(e)}"}), 500
    
    return jsonify(suggestions), 200



 
if __name__ == '__main__':
    app.run(debug=True)