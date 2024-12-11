import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app/app.component';
import { LoginComponent } from './app/components/login/login.component';
import { NavbarComponent } from './app/components/navbar/navbar.component';
import { AdminComponent } from './app/components/add-admin/add-admin.component';
import { TripsComponent } from './app/components/trips/trips.component';
import { CabsComponent } from './app/components/cabs/cabs.component';
import { BookingsComponent } from './app/components/bookings/bookings.component';
import { PaymentsComponent } from './app/components/payments/payments.component';
import { FeedbackComponent } from './app/components/feedback/feedback.component';
import { CommonModule } from '@angular/common';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    NavbarComponent,
    AdminComponent,
    TripsComponent,
    CabsComponent,
    BookingsComponent,
    PaymentsComponent,
    FeedbackComponent,
  ],
  imports: [
    BrowserModule,FormsModule,
    AppRoutingModule,
    ReactiveFormsModule,CommonModule,HttpClientModule,BrowserAnimationsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
