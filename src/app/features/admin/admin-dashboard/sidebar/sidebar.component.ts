import { CommonModule } from '@angular/common';
import { Component, HostListener } from '@angular/core';
import { RouterLink, RouterOutlet } from '@angular/router';


@Component({
  selector: 'app-sidebar',
  imports: [RouterLink,CommonModule,RouterOutlet],
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.css'
})
export class SidebarComponent {

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