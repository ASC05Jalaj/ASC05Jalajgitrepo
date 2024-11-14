import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service'; 

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  username: string = '';
  password: string = '';
  errorMessage: string = '';

  constructor(private router: Router, private authService: AuthService) {}

  ngOnInit(): void {
    if (this.authService.isLoggedIn()) {
      this.router.navigate(['/login']);
    }
  }

  login(): void {
    const storedUser = { username: 'admin', password: 'admin123' }; 

    if (this.username === storedUser.username && this.password === storedUser.password) {
      this.authService.login();  
      this.router.navigate(['/issues']); 
    } else {
      this.errorMessage = 'Invalid username or password!';
    }
  }
}
