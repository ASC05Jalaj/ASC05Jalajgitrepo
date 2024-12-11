import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Payment } from '../../models/payments.model';
import { TBook } from '../../models/tbook.model';
import { PaymentService } from '../../services/payments.service';
import { TBookService } from '../../services/tbook.service';

@Component({
  selector: 'app-payments',
  templateUrl: './payments.component.html',
  styleUrls: ['./payments.component.css'],
})
export class PaymentsComponent implements OnInit {
  paymentForm!: FormGroup;
  payments: Payment[] = [];
  filteredPayments: Payment[] = []; 
  bookings: TBook[] = [];
  editingPayment: Payment | null = null;
  paymentError: string | null = null;  
  searchQuery: string = '';  

  constructor(
    private fb: FormBuilder,
    private paymentService: PaymentService,
    private bookingService: TBookService
  ) {}

  ngOnInit(): void {
    this.initForm();
    this.loadPayments();
    this.loadBookings();
  }

  initForm(): void {
    this.paymentForm = this.fb.group({
      amount: ['', [Validators.required, Validators.min(1)]],
      mode: ['', Validators.required],
      bookingId: ['', Validators.required], 
    });
  }

  loadPayments(): void {
    this.paymentService.getPayments().subscribe((data) => {
      this.payments = data;
      this.filteredPayments = [...this.payments]; 
    });
  }

  loadBookings(): void {
    this.bookingService.getAllBookings().subscribe((data) => {
      this.bookings = data;
    });
  }

  onSubmit(): void {
    if (this.paymentForm.invalid) {
      return;
    }

    const bookingId = this.paymentForm.value.bookingId;

    if (!this.editingPayment) {
      const paymentExists = this.payments.some(payment => payment.booking.id === bookingId);

      if (paymentExists) {
        this.paymentError = `A payment has already been made for booking ID ${bookingId}. You cannot make another payment for this booking.`;
        return;  
      }
    }

    const payment: Payment = {
      amount: this.paymentForm.value.amount,
      mode: this.paymentForm.value.mode,
      booking: {
        id: bookingId,  
      },
    };

    if (this.editingPayment) {
      payment.id = this.editingPayment.id; 
      this.paymentService.updatePayment(payment).subscribe(() => {
        this.loadPayments();
        this.resetForm();
        this.paymentError = null;  // FMR clearing error message if payment is successfully updated
      });
    } else {
      this.paymentService.addPayment(payment).subscribe(() => {
        this.loadPayments();
        this.resetForm();
        this.paymentError = null;
      });
    }
  }

  editPayment(payment: Payment): void {
    this.editingPayment = payment;
    this.paymentForm.patchValue({
      amount: payment.amount,
      mode: payment.mode,
      bookingId: payment.booking.id,
    });
   
  }

  cancelEdit(): void {
    this.resetForm();
  }

  deletePayment(id: string | undefined): void {
    if (id) {
      this.paymentService.deletePayment(id).subscribe(() => {
        this.loadPayments();
      });
    }
  }
  resetForm(): void {
    this.paymentForm.reset();
    this.editingPayment = null;
  }

  searchPayments(): void {
    const query = this.searchQuery.toLowerCase();

    this.filteredPayments = this.payments.filter(payment => {
      return (
        payment.booking.id.toLowerCase().includes(query) || 
        payment.mode.toLowerCase().includes(query)
      );
    });
  }
}
