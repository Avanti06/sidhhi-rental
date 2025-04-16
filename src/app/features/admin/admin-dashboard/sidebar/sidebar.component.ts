import { CommonModule } from '@angular/common';
import { Component, HostListener } from '@angular/core';
import { Router, RouterLink, RouterOutlet } from '@angular/router';


@Component({
  selector: 'app-sidebar',
  imports: [RouterLink,CommonModule,RouterOutlet],
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.css'
})
export class SidebarComponent {

  isLoggedIn: boolean = false;
  role: string | null = null;
  modalType: 'login' | 'register' = 'login';
  modalTitle: string = 'Login';
  logoutMessage = '';
  isCollapsed = false;
  isMobileView = false;
  isMobileOpen = false;



toggleMobileSidebar() {
  this.isMobileOpen = !this.isMobileOpen;
}


  constructor ( private router: Router ){}

  // Add these methods to your component class
ngOnInit() {
  this.checkScreenSize();
  window.addEventListener('resize', this.checkScreenSize.bind(this));
}

ngOnDestroy() {
  window.removeEventListener('resize', this.checkScreenSize.bind(this));
}

checkScreenSize() {
  this.isMobileView = window.innerWidth < 992;
  if (!this.isMobileView) {
    this.isMobileOpen = false;
  }
}

toggleSidebar() {
  if (this.isMobileView) {
    this.isMobileOpen = !this.isMobileOpen;
  } else {
    this.isCollapsed = !this.isCollapsed;
  }
}

openMobileSidebar() {
  this.isMobileOpen = true;
}

closeMobileSidebar() {
  this.isMobileOpen = false;
}

logout() {
  localStorage.removeItem('token');
  localStorage.removeItem('role');
  this.isLoggedIn = false;
  this.role = null;
  this.logoutMessage = 'You have been logged out successfully!';
  window.location.reload(); // Set message
  setTimeout(() => {
    this.logoutMessage = ''; // Clear message after 3 seconds
  }, 2000);
    this.router.navigate(['']);
}
}