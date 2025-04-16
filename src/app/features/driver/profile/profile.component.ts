import { Component, OnInit } from '@angular/core';
import { DriverService } from '../../../cores/services/driver.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-profile',
  imports: [CommonModule,FormsModule],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.css'
})
export class ProfilesComponent implements OnInit{

  driver: any = null;
  loading = true;
  statusMessage = '';

  constructor(private driverService: DriverService) {}

  ngOnInit(): void {
    this.fetchProfile();
  }

  fetchProfile() {
    this.driverService.getDriverProfile().subscribe({
      next: (res) => {
        this.driver = res;
        this.loading = false;
      },
      error: (err) => {
        console.error('Error fetching profile:', err);
        this.loading = false;
      }
    });
  }

  updateStatus() {
    const status = this.driver.availabilityStatus;
  
    this.driverService.updateAvailabilityStatus({ availabilityStatus: status }).subscribe({
      next: (res) => {
        this.statusMessage = 'Status updated successfully!';
        setTimeout(() => this.statusMessage = '', 3000);
      },
      error: (err) => {
        this.statusMessage = 'Failed to update status';
        console.log(err);
      }
    });
  }

}
