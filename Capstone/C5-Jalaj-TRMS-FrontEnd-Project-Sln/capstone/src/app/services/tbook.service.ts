import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { TBook } from '../models/tbook.model';

@Injectable({
  providedIn: 'root'
})
export class TBookService {
  private apiUrl = 'http://localhost:8080/api/bookings';

  constructor(private http: HttpClient) {}
  createBooking(booking: TBook): Observable<TBook> {
    return this.http.post<TBook>(`${this.apiUrl}`, booking);
  }
  
  getAllBookings(): Observable<TBook[]> {
    return this.http.get<TBook[]>(this.apiUrl);}

  getBookingById(id: string): Observable<TBook> {
    return this.http.get<TBook>(`${this.apiUrl}/${id}`);
  }
  updateBooking(id: string, booking: TBook): Observable<TBook> {
    return this.http.put<TBook>(`${this.apiUrl}/${id}`, booking);
  }

  deleteBooking(id: string): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);}

  makePayment(bookingId: string, paymentDetails: any): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/payment/${bookingId}`, paymentDetails);}
}
