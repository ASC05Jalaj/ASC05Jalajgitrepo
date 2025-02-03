import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { IcdCodeSearchService } from "../services/icd-code.service";
import { DiagnosisResult } from "../model/raf-score.model";
import { debounceTime, switchMap, catchError, distinctUntilChanged, throttleTime } from 'rxjs/operators';
import { of } from 'rxjs';
 
@Component({
  selector: 'app-raf-score',
  templateUrl: './raf-score.component.html',
  styleUrls: ['./raf-score.component.css'],
})
export class RafScoreComponent implements OnInit {
  riskScoreForm: FormGroup;
  results: DiagnosisResult[] = [];
  demographicRiskFactor: number = 0;
  addedDiagnosisCodes: string[] = [];
  hoveredCode: string | null = null;
  icdSuggestions: { code: string, description: string }[] = [];
  selectedDiagnosisDescription: string = '';
  loading: boolean = false;
  errorFetchingSuggestions: boolean = false;
  private icdCache = new Map<string, { code: string, description: string }[]>();
  private typingTimeout: any;
 
  // New state for animations
  isSubmitted: boolean = false;  
 
  constructor(private fb: FormBuilder, private icdService: IcdCodeSearchService) {
    this.riskScoreForm = this.fb.group({
      gender: ['', Validators.required],
      diagnosis_code: ['', Validators.required],
      age: ['', [Validators.required, Validators.min(0)]],
      eligibility: ['', Validators.required],
      model_name: ['', Validators.required],
    });
  }
 
  ngOnInit(): void {
    this.riskScoreForm.get('diagnosis_code')?.valueChanges.pipe(
      debounceTime(500),
      throttleTime(1000),
      distinctUntilChanged(),
      switchMap((query: string) => {
        if (query) {
          if (this.icdCache.has(query)) {
            this.icdSuggestions = this.icdCache.get(query)!;
            return of([]);
          } else {
            this.loading = true;
            this.errorFetchingSuggestions = false;
            return this.icdService.searchIcdCodeSuggestions(query).pipe(
              catchError((error) => {
                console.error('Error fetching ICD-10 suggestions', error);
                this.errorFetchingSuggestions = true;
                this.loading = false;
                return of([]);
              })
            );
          }
        } else {
          this.icdSuggestions = [];
          return of([]);
        }
      })
    ).subscribe((suggestions) => {
      if (suggestions.length > 0) {
        this.icdCache.set(this.riskScoreForm.get('diagnosis_code')?.value, suggestions);
      }
      this.loading = false;
      this.icdSuggestions = suggestions;
    });
  }
 
  onDiagnosisCodeInputChange() {
    const diagnosisCode = this.riskScoreForm.get('diagnosis_code')?.value;
    if (diagnosisCode) {
      if (this.typingTimeout) {
        clearTimeout(this.typingTimeout);
      }
      this.typingTimeout = setTimeout(() => {
        this.fetchSuggestions(diagnosisCode);
      }, 500);
    } else {
      this.icdSuggestions = [];
    }
  }
 
  fetchSuggestions(query: string) {
    this.loading = true;
    this.errorFetchingSuggestions = false;
    if (this.icdCache.has(query)) {
      this.icdSuggestions = this.icdCache.get(query)!;
      this.loading = false;
    } else {
      this.icdService.searchIcdCodeSuggestions(query).subscribe(
        (response) => {
          this.icdSuggestions = response.map(item => ({
            code: item.code,
            description: item.description,
          }));
          this.icdCache.set(query, this.icdSuggestions);
          this.loading = false;
        },
        (error) => {
          console.error('Error fetching ICD-10 suggestions', error);
          this.errorFetchingSuggestions = true;
          this.loading = false;
        }
      );
    }
  }
 
  selectIcdCode(suggestedCode: string,) {
    this.riskScoreForm.get('diagnosis_code')?.setValue(suggestedCode);
    // this.selectedDiagnosisDescription = description;
    this.icdSuggestions = [];
  }
 
  onSubmit() {
    const diagnosisCode = this.riskScoreForm.get('diagnosis_code')?.value;
    const gender = this.riskScoreForm.get('gender')?.value;
    const age = this.riskScoreForm.get('age')?.value;
    const eligibility = this.riskScoreForm.get('eligibility')?.value;
    const modelName = this.riskScoreForm.get('model_name')?.value;
 
    if (!diagnosisCode) {
      alert('Please enter a diagnosis code.');
      return;
    }
 
    const data = {
      diagnosis_code: diagnosisCode,
      gender: gender,
      age: age,
      eligibility: eligibility,
      model_name: modelName,
    };
 
    if (this.riskScoreForm.valid) {
      this.icdService.searchDiagnosisCode(data).subscribe(
        (response) => {
          this.results.push(...response);
          this.addDiagnosisCode(diagnosisCode);
          this.clearDiagnosisCodeField();
         
          // Trigger animation when results are received
          this.isSubmitted = true;
        },
        (error) => {
          alert('Please enter valid details');
        }
      );
      this.getDemographicRiskFactor();
    } else {
      alert('Please fill all required fields');
    }
  }
 
  addDiagnosisCode(code: string) {
    if (!this.addedDiagnosisCodes.includes(code)) {
      this.addedDiagnosisCodes.push(code);
    }
  }
 
  removeDiagnosisCode(index: number) {
    this.addedDiagnosisCodes.splice(index, 1);
  }
 
  getDemographicRiskFactor() {
    const age = this.riskScoreForm.get('age')?.value;
    const gender = this.riskScoreForm.get('gender')?.value;
    const eligibility = this.riskScoreForm.get('eligibility')?.value;
 
    const data = { age: age, gender: gender, eligibility: eligibility };
 
    this.icdService.getDemographicRiskFactor(data).subscribe(
      (response) => {
        this.demographicRiskFactor = response.demographicRiskFactor;
      },
      (error) => {
        alert('Failed to fetch demographic risk factor');
      }
    );
  }
 
  getTotalRafScore(): number {
    return this.results.reduce((sum, result) => sum + (result.Risk_Score || 0), 0);
  }
 
  clearDiagnosisCodeField() {
    const diagnosisControl = this.riskScoreForm.get('diagnosis_code');
    if (diagnosisControl) {
      diagnosisControl.setValue('');
      diagnosisControl.markAsPristine();
      diagnosisControl.markAsUntouched();
    }
  }
 
  onReset() {
    this.addedDiagnosisCodes = [];
    this.results = [];
    this.isSubmitted = false; // Reset animation state when clearing form
  }
 
  getRafScore(code: string): number {
    const result = this.results.find(r => r.DIAG === code);
    return result ? result.Risk_Score : 0;
  }
 
  getDiagnosisDescription(code: string): string {
    const result = this.results.find(r => r.DIAG === code);
    return result ? result.ICD_Description : "N/A";
  }
 
  onMouseEnter(code: string) {
    this.hoveredCode = code;
  }
 
  onMouseLeave() {
    this.hoveredCode = null;
  }
}