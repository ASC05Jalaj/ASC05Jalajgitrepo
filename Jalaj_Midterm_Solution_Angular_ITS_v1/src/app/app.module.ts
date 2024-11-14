import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';  // To use ngModel
import { RouterModule } from '@angular/router';  // <-- Make sure RouterModule is imported here
import { AppRoutingModule } from './app-routing.module';  // <-- Make sure your AppRoutingModule is properly imported

import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { IssueListComponent } from './issue-list/issue-list.component';
import { IssueDetailsComponent } from './issue-details/issue-details.component';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { AddIssueComponent } from './add-issue/add-issue.component';
import { IssueOverviewComponent } from './issue-overview/issue-overview.component';
import { UpdateIssuesComponent } from './update-issue/update-issue.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    IssueListComponent,
    IssueDetailsComponent,AddIssueComponent,IssueOverviewComponent,UpdateIssuesComponent  
  ],
  imports: [
    BrowserModule,
    FormsModule,          
    RouterModule,         
    AppRoutingModule,CommonModule,HttpClientModule      
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
