import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Feedback } from '../../models/feedback.model';
import { TBook } from '../../models/tbook.model';
import { FeedbackService } from '../../services/feedback.service';
import { TBookService } from '../../services/tbook.service';

@Component({
  selector: 'app-feedback',
  templateUrl: './feedback.component.html',
  styleUrls: ['./feedback.component.css'],
})
export class FeedbackComponent implements OnInit {
  feedbackForm!: FormGroup;
  feedbacks: Feedback[] = [];
  filteredFeedbacks: Feedback[] = []; 
  bookings: TBook[] = [];
  editingFeedback: Feedback | null = null;
  feedbackError: string | null = null; 
  searchQuery: string = ''; 

  constructor(
    private fb: FormBuilder,
    private feedbackService: FeedbackService,
    private bookingService: TBookService
  ) {}

  ngOnInit(): void {
    this.initForm();
    this.loadFeedbacks();
    this.loadBookings();
  }

  initForm(): void {
    this.feedbackForm = this.fb.group({
      rating: ['', [Validators.required, Validators.min(1), Validators.max(5)]],
      review: ['', Validators.required],
      bookingId: ['', Validators.required],
    });
  }

  loadFeedbacks(): void {
    this.feedbackService.getFeedbacks().subscribe((data) => {
      this.feedbacks = data;
      this.filteredFeedbacks = [...this.feedbacks]; 
    });
  }

  loadBookings(): void {
    this.bookingService.getAllBookings().subscribe((data) => {
      this.bookings = data;
    });
  }

  onSubmit(): void {
    if (this.feedbackForm.invalid) {
      return;
    }

    const bookingId = this.feedbackForm.value.bookingId;

    if (!this.editingFeedback) {
      const feedbackExists = this.feedbacks.some(feedback => feedback.booking.id === bookingId);

      if (feedbackExists) {
        this.feedbackError = `A feedback has already been submitted for booking ID ${bookingId}. You cannot submit another feedback for this booking.`;
        return; 
      }
    }

    const feedback: Feedback = {
      rating: this.feedbackForm.value.rating,
      review: this.feedbackForm.value.review,
      booking: {
        id: bookingId,
      },
    };

    if (this.editingFeedback) {
      feedback.id = this.editingFeedback.id; 
      this.feedbackService.updateFeedback(feedback).subscribe(() => {
        this.loadFeedbacks();
        this.resetForm();
        this.feedbackError = null;
      });
    } else {
      this.feedbackService.addFeedback(feedback).subscribe(() => {
        this.loadFeedbacks();
        this.resetForm();
        this.feedbackError = null;
      });
    }
  }

  editFeedback(feedback: Feedback): void {
    this.editingFeedback = feedback;
    this.feedbackForm.patchValue({
      rating: feedback.rating,
      review: feedback.review,
      bookingId: feedback.booking.id, 
    });
  
  }

  cancelEdit(): void {
    this.resetForm();
  }

  deleteFeedback(id: string | undefined): void {
    if (id) {
      this.feedbackService.deleteFeedback(id).subscribe(() => {
        this.loadFeedbacks();
      });
    }
  }

  resetForm(): void {
    this.feedbackForm.reset();
    this.editingFeedback = null;
  }

  searchFeedbacks(): void {
    const query = this.searchQuery.toLowerCase();
    this.filteredFeedbacks = this.feedbacks.filter(feedback => {
      return (
        feedback.id?.toLowerCase().includes(query)||
        feedback.booking.id.toLowerCase().includes(query) || 
        feedback.rating.toString().includes(query) || 
        feedback.review.toLowerCase().includes(query)
      );
    });
  }
}