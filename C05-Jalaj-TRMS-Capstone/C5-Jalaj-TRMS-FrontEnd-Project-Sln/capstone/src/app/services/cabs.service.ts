import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Cabs } from '../models/cabs.model';

@Injectable({
  providedIn: 'root'
})
export class CabService {
  private apiUrl = 'http://localhost:8080/api/cabs'; 

  constructor(private http: HttpClient) {}

  getCabs(): Observable<Cabs[]> {
    console.log('Fetching all cabs from API...');
    return this.http.get<Cabs[]>(this.apiUrl);
  }

  getCabById(id: string): Observable<Cabs> {
    console.log(`Fetching cab with ID: ${id}`);
    return this.http.get<Cabs>(`${this.apiUrl}/${id}`);
  }

  addCab(cab: Cabs): Observable<Cabs> {
    console.log('Adding Cab:', cab); // Log the cab data
    return this.http.post<Cabs>(this.apiUrl, cab);
  }

  updateCab(id: string, cab: Partial<Cabs>): Observable<Cabs> {
    console.log(`Updating cab with ID: ${id}`, cab);
    return this.http.put<Cabs>(`${this.apiUrl}/${id}`, cab);
  }

  deleteCab(id: string): Observable<void> {
    console.log(`Deleting cab with ID: ${id}`);
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}
