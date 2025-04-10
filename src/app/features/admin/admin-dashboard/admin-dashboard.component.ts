import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { Router, RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { SidebarComponent } from './sidebar/sidebar.component';


@Component({
  selector: 'app-admin-dashboard',
  imports: [RouterOutlet,SidebarComponent,CommonModule,RouterLink],
  templateUrl: './admin-dashboard.component.html',
  styleUrl: './admin-dashboard.component.css'
})
export class AdminDashboardComponent {
  isCollapsed = false;
  isMobileView = false;
  isMobileOpen = false;

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

}
