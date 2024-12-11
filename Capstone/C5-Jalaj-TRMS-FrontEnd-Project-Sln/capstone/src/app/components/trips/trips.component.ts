import { Component, OnInit } from '@angular/core';
import { TBook } from '../../models/tbook.model';
import { TBookService } from '../../services/tbook.service';
import { CabService } from '../../services/cabs.service';
import { Cabs } from '../../models/cabs.model';
import { FormGroup, FormControl } from '@angular/forms';

@Component({
  selector: 'app-trips',
  templateUrl: './trips.component.html',
  styleUrls: ['./trips.component.css']
})
export class TripsComponent implements OnInit {
  bookings: TBook[] = []; // Holds all bookings
  filteredBookings: TBook[] = []; // Holds filtered bookings
  selectedBooking: TBook | null = null; // Holds the booking to edit
  statusOptions: string[] = [ 'Confirmed', 'In-Progress', 'Completed', 'Cancelled']; // Status options for dropdown
  cabs: Cabs[] = []; // Holds the list of available cabs for the dropdown

  // Reactive form for search
  searchForm: FormGroup;

  constructor(private tBookService: TBookService, private cabService: CabService) {
    this.searchForm = new FormGroup({
      search: new FormControl('') // Initialize the search control
    });
  }

  ngOnInit(): void {
    this.loadBookings(); // Fetch bookings on component initialization
    this.loadCabs(); // Fetch available cabs for the model dropdown

    // Watch the search form value changes
    this.searchForm.get('search')?.valueChanges.subscribe(value => {
      this.filterBookings(value); // Filter bookings based on search input
    });
  }

  // Fetch all bookings
  loadBookings(): void {
    this.tBookService.getAllBookings().subscribe(
      (data) => {
        this.bookings = data;
        this.filteredBookings = data; // Initially show all bookings
      },
      (error) => {
        console.error('Error loading bookings:', error);
        alert('Failed to load bookings.');
      }
    );
  }

  // Fetch all available cabs
  loadCabs(): void {
    this.cabService.getCabs().subscribe(
      (data) => {
        this.cabs = data;
      },
      (error) => {
        console.error('Error loading cabs:', error);
        alert('Failed to load cabs.');
      }
    );
  }

  // Edit a booking
  onEdit(booking: TBook): void {
    this.selectedBooking = { ...booking }; // Create a copy to avoid direct mutation
  }

  // Save the edited booking
  onSave(): void {
    if (this.selectedBooking) {
      const updatedBooking = {
        ...this.selectedBooking,
        cabId: this.selectedBooking.cabId
      };

      this.tBookService.updateBooking(this.selectedBooking.id!, updatedBooking).subscribe(
        (updatedBooking) => {
          this.selectedBooking = null; // Reset selection
          this.loadBookings(); // Refresh the booking list
        },
        (error) => {
          console.error('Error updating booking:', error);
        }
      );
    }
  }

  // Cancel editing
  onCancel(): void {
    this.selectedBooking = null;
  }

  // Delete a booking
  onDelete(id: string): void {
    this.tBookService.deleteBooking(id).subscribe(
      () => {
        this.loadBookings(); // Refresh the booking list
      },
      (error) => {
        console.error('Error deleting booking:', error);
      }
    );
  }

  // Filter bookings based on search term
  filterBookings(searchTerm: string): void {
    if (!searchTerm) {
      this.filteredBookings = this.bookings; // If no search term, show all bookings
      return;
    }

    // Convert search term to lowercase for case-insensitive matching
    const lowerCaseSearchTerm = searchTerm.toLowerCase();

    // Filter bookings based on the search term matching any of the fields
    this.filteredBookings = this.bookings.filter(booking => {
      return (
        booking.id?.toString().toLowerCase().includes(lowerCaseSearchTerm) ||
        booking.passenger.toLowerCase().includes(lowerCaseSearchTerm) ||
        booking.phoneNumber.toLowerCase().includes(lowerCaseSearchTerm) ||
        booking.pickup.toLowerCase().includes(lowerCaseSearchTerm) ||
        booking.destination.toLowerCase().includes(lowerCaseSearchTerm) ||
        booking.bookingDate?.toString().toLowerCase().includes(lowerCaseSearchTerm) ||
        booking.model.toLowerCase().includes(lowerCaseSearchTerm) ||
        booking.status.toLowerCase().includes(lowerCaseSearchTerm)
      );
    });
  }
}
