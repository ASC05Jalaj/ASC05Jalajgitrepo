import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class IssueService {

  private apiUrl = 'http://localhost:3000/issues';  

  constructor(private http: HttpClient) {}

  // Get all issues
  getIssues(): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrl);
  }

  // Add a new issue
  addIssue(issue: any): Observable<any> {
    const newIssue = {
      title: issue.title,
      description: issue.description,
      priority: issue.priority,
      assignee: issue.assignee,
      status: issue.status || 'Open',  
      updatedAt: new Date().toISOString()  
    };
    return this.http.post(this.apiUrl, newIssue);  
  }

  // Delete an issue by ID
  deleteIssue(issueId: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${issueId}`);
  }

  updateIssueFields(issueId: number, updatedFields: { status: string }): Observable<any> {
    const updateData = {
      ...updatedFields,
      updatedAt: new Date().toISOString()  
    };

    return this.http.patch<any>(`${this.apiUrl}/${issueId}`, updateData); 
  }

  updateIssue(issue: any): Observable<any> {
    const updatedIssue = {
      ...issue,
      updatedAt: new Date().toISOString()  
    };
    return this.http.put<any>(`${this.apiUrl}/${issue.id}`, updatedIssue);  
  }
}
