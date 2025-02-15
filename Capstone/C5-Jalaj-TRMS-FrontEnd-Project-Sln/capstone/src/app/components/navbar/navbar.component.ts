import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';


@Component({
  selector: 'app-navbar',
  // standalone: true,
  // imports: [],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})
export class NavbarComponent {

  router= inject(Router)

  logout(){
    localStorage.removeItem("loginuser");
    this.router.navigateByUrl('login');
  }
  

}

