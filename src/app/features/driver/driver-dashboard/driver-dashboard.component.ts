import { Component, OnInit } from '@angular/core';
import { Router, RouterModule, RouterOutlet } from '@angular/router';
import { AuthService } from '../../../cores/auth.service';
import { CommonModule } from '@angular/common';
import { DriverService } from '../../../cores/services/driver.service';

@Component({
  selector: 'app-driver-dashboard',
  imports: [RouterModule,RouterOutlet],
  templateUrl: './driver-dashboard.component.html',
  styleUrl: './driver-dashboard.component.css'
})
export class DriverDashboardComponent implements OnInit{

  driverName: string = '';
  driverRole: string = '';// You can fetch this from a service
  driver: any;

  constructor(private authService: AuthService, private driverService: DriverService) {}

  ngOnInit(): void {
    const user = this.authService.currentUserValue;
    // console.log("Decoded user from token: ", user);
    if (user) {
      this.driverName = user.name;
      this.driverRole = user.role;
    }
    // console.log(this.driverName);
    // console.log(this.driverRole);
  }

  

  logout() {
    this.authService.logout();// or authService.logout()
    
  }
}
