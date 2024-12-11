import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './app/components/login/login.component';
import { NavbarComponent } from './app/components/navbar/navbar.component';
import { TripsComponent } from './app/components/trips/trips.component';
import { CabsComponent } from './app/components/cabs/cabs.component';
import { BookingsComponent } from './app/components/bookings/bookings.component';
import { PaymentsComponent } from './app/components/payments/payments.component';
import { FeedbackComponent } from './app/components/feedback/feedback.component';
import { AdminComponent } from './app/components/add-admin/add-admin.component';
import { HomeComponent } from './app/components/home/home.component';
import { authGuard } from './app/auth.guard';

const routes: Routes = [
  { path: '', component: LoginComponent }, 
  {
    path: 'navbar',
    component: NavbarComponent, canActivate:[authGuard],
    children: [
      { path: 'home', component: HomeComponent }, 
      { path: 'trips', component: TripsComponent },
      { path: 'cabs', component: CabsComponent },
      { path: 'bookings', component: BookingsComponent },
      { path: 'payments', component: PaymentsComponent },
      { path: 'feedback', component: FeedbackComponent },
      { path: 'add-admin', component: AdminComponent }
    ]
  },
  { path: '**', redirectTo: '' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
