import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { IssueService } from '../issue.service';

@Component({
  selector: 'app-issue-overview',
  templateUrl: './issue-overview.component.html',
  styleUrls: ['./issue-overview.component.css']
})
export class IssueOverviewComponent implements OnInit {

  issues: any[] = [];
  filteredIssues: any[] = [];
  searchTerm: string = '';

  constructor(private issueService: IssueService) {}

  ngOnInit(): void {
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

}
