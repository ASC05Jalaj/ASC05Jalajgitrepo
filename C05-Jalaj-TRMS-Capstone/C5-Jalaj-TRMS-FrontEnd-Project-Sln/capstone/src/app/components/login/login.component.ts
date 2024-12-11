import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';
import { AdminService } from '../../services/admin.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent {
  userobj: any = {
    email: '',
    password: '',
  };
  errorMessage: string = '';
  attempts: number = 0;
  maxAttempts: number = 3;
  lockoutTime: number = 30 * 60 * 1000;
  lockoutTimestamp: number | null = null;
  isLockedOut: boolean = false;
  remainingTime: number = 0;
  router = inject(Router);
  adminService = inject(AdminService);

  onlogin() {
    if (this.isLockedOut) {
      this.errorMessage = 'Your account is locked. Please try again later.';
      return;
    }

    this.adminService.getadmins().subscribe(
      (admins) => {
        const admin = admins.find(
          (a) => a.email === this.userobj.email && a.password === this.userobj.password
        );

        if (admin) {
          this.router.navigateByUrl('navbar/home');
          localStorage.setItem('loginuser', this.userobj.email);
          this.resetAttempts();
        } else {
          this.attempts++;
          this.errorMessage = 'Invalid username or password';

          if (this.attempts >= this.maxAttempts) {
            this.lockoutTimestamp = Date.now();
            this.isLockedOut = true;
            this.errorMessage =
              'Too many invalid attempts. Your account is locked for 30 minutes.';
            this.startLockoutTimer();
          }
        }
      },
      (error) => {
        this.errorMessage = 'Error connecting to server. Please try again later.';
        console.error(error);
      }
    );
  }

  startLockoutTimer() {
    const interval = setInterval(() => {
      if (this.lockoutTimestamp) {
        const timeElapsed = Date.now() - this.lockoutTimestamp;
        this.remainingTime = Math.max(0, Math.floor((this.lockoutTime - timeElapsed) / 1000));

        if (timeElapsed >= this.lockoutTime) {
          this.resetAttempts();
          clearInterval(interval);
        }
      }
    }, 1000);
  }

  resetAttempts() {
    this.attempts = 0;
    this.isLockedOut = false;
    this.lockoutTimestamp = null;
    this.remainingTime = 0;
  }

  get maxAttemptsReached(): boolean {
    return this.attempts >= this.maxAttempts;
  }
}
