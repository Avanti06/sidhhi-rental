import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { SidebarComponent } from './sidebar/sidebar.component';


@Component({
  selector: 'app-admin-dashboard',
  imports: [RouterOutlet,CommonModule,SidebarComponent],
  templateUrl: './admin-dashboard.component.html',
  styleUrl: './admin-dashboard.component.css'
})
export class AdminDashboardComponent {
 
}
