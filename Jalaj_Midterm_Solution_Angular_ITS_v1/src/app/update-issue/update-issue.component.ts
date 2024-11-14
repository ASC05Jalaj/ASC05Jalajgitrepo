import { Component, OnInit } from '@angular/core';

import { IssueService } from '../issue.service';

@Component({
  selector: 'app-update-issues',
  templateUrl: './update-issue.component.html',
  styleUrls: ['./update-issue.component.css']
})
export class UpdateIssuesComponent implements OnInit {
  issues: any[] = [];
  updateMessage: string | null = null;  

  constructor(private issueService: IssueService) {}

  ngOnInit(): void {
    this.issueService.getIssues().subscribe(data => {
      this.issues = data;
    });
  }

  updateIssue(issue: any): void {
    const updatedFields = {
      status: issue.status  
    };

    this.issueService.updateIssueFields(issue.id, updatedFields).subscribe(updatedIssue => {

      const index = this.issues.findIndex(i => i.id === updatedIssue.id);
      if (index !== -1) {
        this.issues[index] = updatedIssue;
      }

      this.updateMessage = 'Issue status has been updated successfully!';

      setTimeout(() => {
        this.updateMessage = null;
      }, 3000);
    });
  }

  deleteIssue(issueId: number): void {
    const confirmDelete = confirm('Are you sure you want to delete this issue?');
    if (confirmDelete) {
      this.issueService.deleteIssue(issueId).subscribe(() => {
        
        this.issues = this.issues.filter(issue => issue.id !== issueId);
        this.updateMessage = 'Issue has been deleted successfully!';
        
        setTimeout(() => {
          this.updateMessage = null;
        }, 3000);
      }, error => {
        console.error('Error deleting issue', error);
        this.updateMessage = 'An error occurred while deleting the issue.';
        setTimeout(() => {
          this.updateMessage = null;
        }, 3000);
      });
    }
  }
}
