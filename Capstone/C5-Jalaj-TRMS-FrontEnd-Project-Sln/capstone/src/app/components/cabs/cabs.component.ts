import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CabService } from '../../services/cabs.service';
import { Cabs } from '../../models/cabs.model';

@Component({
  selector: 'app-cab',
  templateUrl: './cabs.component.html',
  styleUrls: ['./cabs.component.css']
})
export class CabsComponent implements OnInit {
  cabs: Cabs[] = [];
  filteredCabs: Cabs[] = []; 
  cabForm: FormGroup;
  selectedCab: Cabs | null = null;
  searchTerm: string = '';  

  constructor(private cabService: CabService, private fb: FormBuilder) {
    this.cabForm = this.fb.group({
      model: ['', Validators.required],
      vNumber: ['', [Validators.required, Validators.pattern(/^[A-Z]{2}\d{2}[A-Z]+\d{4}$/)]],
      driver: ['', Validators.required],
      seats: ['', [Validators.required, Validators.min(1)]],
    });
  }

  ngOnInit(): void {
    this.loadCabs();
  }

  loadCabs() {
    this.cabService.getCabs().subscribe((data) => {
      this.cabs = data;
      this.filteredCabs = [...this.cabs]; 
    });
  }

  filterCabs() {
    if (this.searchTerm.trim() === '') {
      this.filteredCabs = [...this.cabs];  
    } else {
      this.filteredCabs = this.cabs.filter(cab => this.searchByField(cab));
    }
  }

  searchByField(cab: Cabs): boolean {
    const searchTermLower = this.searchTerm.toLowerCase();
    return (
      cab.id.toLowerCase().includes(searchTermLower) ||
      cab.model.toLowerCase().includes(searchTermLower) ||
      cab.vNumber.toLowerCase().includes(searchTermLower) ||
      cab.driver.toLowerCase().includes(searchTermLower) ||
      cab.seats.toString().includes(searchTermLower)
    );
  }

  onAddCab() {
    if (this.cabForm.valid) {
      this.cabService.addCab(this.cabForm.value).subscribe({
        next: () => {
          this.loadCabs();
          this.cabForm.reset();
        },
        error: (err) => {
          console.error('Error adding cab:', err);
        }
      });
    } else {
      alert('Please fill in all required fields.');
    }
  }

  onSelectCab(cab: Cabs) {
    this.selectedCab = cab;
    this.cabForm.patchValue(cab);
  }

  onUpdateCab() {
    if (this.selectedCab && this.cabForm.valid) {
      this.cabService.updateCab(this.selectedCab.id, this.cabForm.value).subscribe({
        next: () => {
          this.loadCabs();
          this.selectedCab = null;
          this.cabForm.reset();
        },
        error: (err) => {
          console.error('Error updating cab:', err);
        }
      });
    }
  }

  onDeleteCab(id: string) {
    if (confirm('Are you sure you want to delete this cab?')) {
      this.cabService.deleteCab(id).subscribe({
        next: () => {
          this.loadCabs();
        },
        error: (err) => {
          console.error('Error deleting cab:', err);
        }
      });
    }
  }

  resetForm() {
    this.selectedCab = null;
    this.cabForm.reset();
  }
}
