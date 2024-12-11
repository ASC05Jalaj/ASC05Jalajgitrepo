import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, AbstractControl, ValidationErrors } from '@angular/forms';
import { TBookService } from '../../services/tbook.service';
import { CabService } from '../../services/cabs.service';
import { Cabs } from '../../models/cabs.model';

@Component({
  selector: 'app-bookings',
  templateUrl: './bookings.component.html',
  styleUrls: ['./bookings.component.css'],
})
export class BookingsComponent implements OnInit {
  bookingForm: FormGroup;
  cabs: Cabs[] = [];
  statusOptions: string[] = ['Confirmed', 'In-Progress', 'Completed', 'Cancelled'];

  constructor(
    private fb: FormBuilder,
    private tBookService: TBookService,
    private cabService: CabService
  ) {
    this.bookingForm = this.fb.group({
      passenger: ['', [Validators.required, Validators.pattern('[a-zA-Z ]*')]],
      phoneNumber: [
        '',
        [Validators.required, Validators.pattern('^[0-9]{10}$')],
      ],
      pickup: ['', Validators.required],
      destination: ['', Validators.required],
      status: ['Confirmed', Validators.required],
      bookingDate: [
        '',
        [Validators.required, this.dateNotInPast], 
      ],
      bookingTime: ['', Validators.required],
      model: ['', Validators.required], 
      cab: ['', Validators.required], 
    });
  }

  ngOnInit(): void {
    this.loadCabs();
  }

  //FMR loading cabs for dropdown
  loadCabs(): void {
    this.cabService.getCabs().subscribe(
      (data) => {
        this.cabs = data;
      },
      (error) => {
        console.error('Error loading cabs:', error);
      }
    );
  }

  // FMR handling model selection
  onModelChange(event: Event): void {
    const target = event.target as HTMLSelectElement;
    const selectedModel = target?.value;
  
    if (selectedModel) {
      const selectedCab = this.cabs.find((cab) => cab.model === selectedModel);
      if (selectedCab) {
        this.bookingForm.patchValue({ cab: selectedCab.id });
      }
    }
  }

  onSubmit(): void {
    if (this.bookingForm.valid) {
      const bookingData = this.bookingForm.value;

      const bookingTime = new Date(`1970-01-01T${bookingData.bookingTime}:00`);
      const hours = bookingTime.getHours();
      const minutes = bookingTime.getMinutes();
      const ampm = hours >= 12 ? 'PM' : 'AM';
      const formattedTime = `${hours % 12 || 12}:${minutes < 10 ? '0' : ''}${minutes} ${ampm}`;

      //FMR Updating bookingData with the formatted time
      bookingData.bookingTime = formattedTime;

      bookingData.cab = { id: bookingData.cab };

      console.log('Booking data being submitted:', bookingData);

      this.tBookService.createBooking(bookingData).subscribe(
        (response) => {
          console.log('Booking response:', response);
          this.bookingForm.reset({ status: 'Pending' });
        },
        (error) => {
          console.error('Error creating booking:', error);
          console.error('Error details:', error.error);
        }
      );
    } else {
      this.markAllFieldsAsTouched();
      alert('Please fill out all required fields correctly.');
    }
  }

  private markAllFieldsAsTouched(): void {
    for (const control in this.bookingForm.controls) {
      if (this.bookingForm.controls.hasOwnProperty(control)) {
        this.bookingForm.controls[control].markAsTouched();
      }
    }
  }

  //FMR for past date
  dateNotInPast(control: AbstractControl): ValidationErrors | null {
    const selectedDate = new Date(control.value);
    const currentDate = new Date();
    currentDate.setHours(0, 0, 0, 0); 

    if (selectedDate < currentDate) {
      return { dateInPast: true };
    }
    return null;
  }
  get formControls() {
    return this.bookingForm.controls;
  }
}
