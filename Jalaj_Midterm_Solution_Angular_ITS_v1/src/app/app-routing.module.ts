import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { IssueListComponent } from './issue-list/issue-list.component';
import { IssueDetailsComponent } from './issue-details/issue-details.component';  
import { AppComponent } from './app.component';
import { AddIssueComponent } from './add-issue/add-issue.component';
import { IssueOverviewComponent } from './issue-overview/issue-overview.component';
import { UpdateIssuesComponent } from './update-issue/update-issue.component';
import { AuthGuard } from './auth.guard';

const routes: Routes = [
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  { path: 'issues', component: IssueListComponent, canActivate:[AuthGuard] },
  { path: 'issue/:id', component: IssueDetailsComponent, canActivate:[AuthGuard] },
  { path: 'add-issue', component: AddIssueComponent, canActivate:[AuthGuard] },
  { path: 'view-issues', component: IssueOverviewComponent, canActivate:[AuthGuard]},
  { path: 'update-issues', component: UpdateIssuesComponent, canActivate:[AuthGuard] },  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],  
  exports: [RouterModule],
  bootstrap:[AppComponent]                   
})
export class AppRoutingModule { }
