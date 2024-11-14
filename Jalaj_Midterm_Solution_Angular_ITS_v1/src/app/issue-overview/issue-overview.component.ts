import { Component, OnInit } from '@angular/core';
import { IssueService } from '../issue.service';  // Make sure your issue service is correctly imported

@Component({
  selector: 'app-issue-overview',
  templateUrl: './issue-overview.component.html',
  styleUrls: ['./issue-overview.component.css']
})
export class IssueOverviewComponent implements OnInit {
  issues: any[] = [];               // Array to store the fetched issues
  filteredIssues: any[] = [];       // Array to store the filtered issues based on search term
  searchTerm: string = '';          // The string to hold the search term entered by the user

  // Optional: You can use separate filters for each field if you want (status, priority, assignee).
  // These properties would be bound to input fields in the template.
  statusFilter: string = '';
  priorityFilter: string = '';
  assigneeFilter: string = '';

  constructor(private issueService: IssueService) {}

  ngOnInit(): void {
    // Fetch issues from the service when the component is initialized
    this.issueService.getIssues().subscribe(data => {
      this.issues = data;
      this.filteredIssues = data;  // Initially set filtered issues to the full list
    });
  }

  /**
   * Filters the issues based on the search term entered by the user.
   */
  filterIssues(): void {
    const searchTermLower = this.searchTerm.toLowerCase();  // Convert search term to lowercase for case-insensitive search
    const statusFilterLower = this.statusFilter.toLowerCase();
    const priorityFilterLower = this.priorityFilter.toLowerCase();
    const assigneeFilterLower = this.assigneeFilter.toLowerCase();

    // Filter issues based on multiple criteria
    this.filteredIssues = this.issues.filter(issue =>
      (issue.title.toLowerCase().includes(searchTermLower) ||
      issue.description.toLowerCase().includes(searchTermLower) ||
      issue.status.toLowerCase().includes(searchTermLower) ||
      issue.priority.toLowerCase().includes(searchTermLower) ||
      issue.assignee.toLowerCase().includes(searchTermLower)) &&
      (issue.status.toLowerCase().includes(statusFilterLower)) &&
      (issue.priority.toLowerCase().includes(priorityFilterLower)) &&
      (issue.assignee.toLowerCase().includes(assigneeFilterLower))
    );
  }
}
