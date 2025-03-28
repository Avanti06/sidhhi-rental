import { CommonModule } from '@angular/common';
import { Component, HostListener } from '@angular/core';
import { RouterLink, RouterOutlet } from '@angular/router';


@Component({
  selector: 'app-sidebar',
  imports: [RouterLink,CommonModule],
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.css'
})
export class SidebarComponent {

  isCollapsed = false;
  isMobileView = false;

  constructor() {
    this.checkScreenSize();
    window.addEventListener("resize", () => this.checkScreenSize());
  }

  toggleSidebar() {
    this.isCollapsed = !this.isCollapsed;
  }

  checkScreenSize() {
    this.isMobileView = window.innerWidth <= 768;
  }
}