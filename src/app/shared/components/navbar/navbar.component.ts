import { AfterViewInit, Component, ElementRef, OnInit, Renderer2, ViewChild } from '@angular/core';

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

  @ViewChild('navbarToggler') navbarToggler!: ElementRef;
  
  isLoggedIn: boolean = false;
  role: string | null = null;
  modalType: 'login' | 'register' = 'login';
  modalTitle: string = 'Login';
  logoutMessage = '';

  // Reference to Bootstrap collapse instance
  private bsCollapse: any;

  constructor(private router: Router,private renderer: Renderer2,private authService: AuthService) {
  }

  ngOnInit() {
     this.checkAuthStatus();
  }

  ngAfterViewInit() {
    // Listen for login event from LoginComponent
    document.addEventListener('userLoggedIn', () => {
      this.checkAuthStatus();
    });

    // Set up click event listener for document to close navbar on outside clicks
    this.renderer.listen('document', 'click', (event: Event) => {
      const navbarCollapse = document.getElementById('navbarNav');
      const togglerElement = this.navbarToggler?.nativeElement;
      
      // Check if navbar is expanded and click target is outside the navbar
      if (navbarCollapse && 
          navbarCollapse.classList.contains('show') && 
          togglerElement && 
          !navbarCollapse.contains(event.target as Node) && 
          !togglerElement.contains(event.target as Node)) {
        this.closeNavbar();
      }
    });
  }

  closeNavbar(): void {
    
    // Find the collapse element
    const navbarCollapse = document.getElementById('navbarNav');
    
    // If the navbar is expanded (has 'show' class), close it
    if (navbarCollapse && navbarCollapse.classList.contains('show')) {
      // Update the toggle button properties
      if (this.navbarToggler && this.navbarToggler.nativeElement) {
        this.renderer.setAttribute(this.navbarToggler.nativeElement, 'aria-expanded', 'false');
        this.renderer.addClass(this.navbarToggler.nativeElement, 'collapsed');
      }
      
      // Remove the 'show' class from the collapse element
      this.renderer.removeClass(navbarCollapse, 'show');
    }
  }

  toggleNavbar(): void {
    setTimeout(() => {
      const navbarCollapse = document.getElementById('navbarNav');
      
      if (navbarCollapse) {
        const isExpanded = navbarCollapse.classList.contains('show');
        
        if (isExpanded) {
          this.renderer.setAttribute(this.navbarToggler.nativeElement, 'aria-expanded', 'false');
          this.renderer.addClass(this.navbarToggler.nativeElement, 'collapsed');
          this.renderer.removeClass(navbarCollapse, 'show');
        } else {
          this.renderer.setAttribute(this.navbarToggler.nativeElement, 'aria-expanded', 'true');
          this.renderer.removeClass(this.navbarToggler.nativeElement, 'collapsed');
          this.renderer.addClass(navbarCollapse, 'show');
        }
      }
    }, 0);
  }
  
  openModal(type: 'login' | 'register') {
    this.modalType = type;
    this.modalTitle = type === 'login' ? 'Login' : 'Sign Up';
  }
  
  checkAuthStatus() {
    const token = localStorage.getItem('token');
    this.role = localStorage.getItem('role');

    this.isLoggedIn = !!token;
  }



get hideNavbar(): boolean {
  const role = this.authService.getUserRole();
  return role === 'driver' || role === 'admin';
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
