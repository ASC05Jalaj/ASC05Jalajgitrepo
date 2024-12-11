import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Admin } from "../models/admin.model";
import { Observable } from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class AdminService {
  baseUrl: string = "http://localhost:8080/api/admin";

  constructor(private http: HttpClient) { }

  getadmins(): Observable<Admin[]> {
    return this.http.get<Admin[]>(this.baseUrl);
  }

  addadmins(admins: Admin): Observable<Admin> {
    return this.http.post<Admin>(this.baseUrl, admins);
  }

  updateadmins(admins: Admin): Observable<Admin> {
    return this.http.put<Admin>(`${this.baseUrl}/${admins.id}`, admins);
  }

  deleteadmins(id: string): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/${id}`);
  }

  login(admin: { email: string, password: string }): Observable<Admin> {
    return this.http.post<Admin>(`${this.baseUrl}/login`, admin);
  }
}
