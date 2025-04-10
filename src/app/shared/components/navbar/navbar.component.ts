import { AfterViewInit, Component, OnInit } from '@angular/core';

import { CommonModule } from '@angular/common';
import { LoginComponent } from '../../../features/auth/login/login.component';
import { RegisterComponent } from '../../../features/auth/register/register.component';
import { AboutusComponent } from '../aboutus/aboutus.component';
import { Router, RouterLink, RouterModule } from '@angular/router';
import { AuthService } from '../../../cores/auth.service';
import { ProfileComponent } from '../../../features/user/profile/profile.component';

declare var bootstrap: any;
@Component({
  selector: 'app-navbar',
  imports: [ProfileComponent,CommonModule,LoginComponent,RegisterComponent,RouterModule],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})
export class NavbarComponent implements OnInit, AfterViewInit {

  isLoggedIn: boolean = false;
  role: string | null = null;
  modalType: 'login' | 'register' = 'login';
  modalTitle: string = 'Login';
  logoutMessage = '';


  constructor(private router: Router,private authService: AuthService) {
  }

  ngOnInit() {
     this.checkAuthStatus();
  }

  ngAfterViewInit() {
    // Listen for login event from LoginComponent
    document.addEventListener('userLoggedIn', () => {
      this.checkAuthStatus();
    });
  }

  checkAuthStatus() {
    const token = localStorage.getItem('token');
    this.role = localStorage.getItem('role');

    this.isLoggedIn = !!token;
  }

openModal(type: 'login' | 'register') {
  this.modalType = type;
  this.modalTitle = type === 'login' ? 'Login' : 'Sign Up';
}

logout() {
  localStorage.removeItem('token');
  localStorage.removeItem('role');
  this.isLoggedIn = false;
  this.role = null;
  this.logoutMessage = 'You have been logged out successfully!'; // Set message
  setTimeout(() => {
    this.logoutMessage = ''; // Clear message after 3 seconds
  }, 2000);
    this.router.navigate(['']);
}


}
