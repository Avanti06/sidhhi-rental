import { Component, OnInit } from '@angular/core';
import { Router, RouterOutlet } from '@angular/router';
import { AuthService } from '../../../cores/auth.service';

@Component({
  selector: 'app-driver-dashboard',
  imports: [RouterOutlet],
  templateUrl: './driver-dashboard.component.html',
  styleUrl: './driver-dashboard.component.css'
})
export class DriverDashboardComponent implements OnInit{

  driverName: string = '';
  driverRole: string = '';// You can fetch this from a service

  constructor(private authService: AuthService) {}

  ngOnInit(): void {
    const user = this.authService.currentUserValue;
    console.log("Decoded user from token: ", user);
    if (user) {
      this.driverName = user.name;
      this.driverRole = user.role;
    }
    console.log(this.driverName);
    console.log(this.driverRole);
  }

  logout() {
    this.authService.logout();// or authService.logout()
    
  }
}
