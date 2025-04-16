import { Component } from '@angular/core';
import { DriverService } from '../../../cores/services/driver.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-driver-profile',
  imports: [CommonModule,FormsModule],
  templateUrl: './driver-profile.component.html',
  styleUrl: './driver-profile.component.css'
})
export class DriverProfileComponent {

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
