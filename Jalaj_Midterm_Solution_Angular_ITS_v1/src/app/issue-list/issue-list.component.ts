import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { IssueService } from '../issue.service';

@Component({
  selector: 'app-issue-list',
  templateUrl: './issue-list.component.html',
  styleUrls: ['./issue-list.component.css']
})
export class IssueListComponent implements OnInit {
  issues: any[] = [];
  filteredIssues: any[] = [];
  isLoggedIn: boolean = false;
  searchTerm: string = '';

  constructor(private issueService: IssueService, private router: Router) {}

  ngOnInit(): void {
    this.isLoggedIn = localStorage.getItem('isLoggedIn') === 'true';
    if (!this.isLoggedIn) {
      this.router.navigate(['/login']);
    }

    this.issueService.getIssues().subscribe(data => {
      this.issues = data;
      this.filteredIssues = data;  
    });
  }

  filterIssues(): void {
    if (this.searchTerm) {
      this.filteredIssues = this.issues.filter(issue =>
        issue.title.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
        issue.description.toLowerCase().includes(this.searchTerm.toLowerCase())
      );
    } else {
      this.filteredIssues = this.issues;  
    }
  }

  deleteIssue(issueId: number): void {
    this.issueService.deleteIssue(issueId).subscribe(() => {
      this.issues = this.issues.filter(issue => issue.id !== issueId);
      this.filterIssues();  
    });
  }

  updateIssueStatus(issue: any): void {
    this.issueService.updateIssue(issue).subscribe(updatedIssue => {
      const index = this.issues.findIndex(i => i.id === updatedIssue.id);
      if (index !== -1) {
        this.issues[index] = updatedIssue;
      }
      this.filterIssues(); 
    });
  }

  navigateToAddIssue(): void {
    this.router.navigate(['/add-issue']);
  }

  logout(): void {
    localStorage.removeItem('isLoggedIn');
    this.router.navigate(['/login']);
  }

  getStatusClass(status: string): string {
    switch(status) {
      case 'Open':
        return 'status-open';
      case 'In Progress':
        return 'status-in-progress';
      case 'Resolved':
        return 'status-resolved';
      case 'Closed':
        return 'status-closed';
      default:
        return '';
    }
  }
}
