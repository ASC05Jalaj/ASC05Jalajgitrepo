import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { IssueService } from '../issue.service';

@Component({
  selector: 'app-add-issue',
  templateUrl: './add-issue.component.html',
  styleUrls: ['./add-issue.component.css']
})
export class AddIssueComponent implements OnInit {

  newIssue: any = {
    title: '',
    description: '',
    priority: 'Low',
    assignee: '',
    status: 'Open'
  };
  isLoggedIn: boolean = false;

  constructor(private issueService: IssueService, private router: Router) {}

  ngOnInit(): void {
    this.isLoggedIn = localStorage.getItem('isLoggedIn') === 'true';
    if (!this.isLoggedIn) {
      this.router.navigate(['/login']);
    }
  }

  addIssue(): void {
    this.issueService.addIssue(this.newIssue).subscribe(() => {
      this.router.navigate(['/issues']);  // Navigate back to the issues list
    });
  }
}
