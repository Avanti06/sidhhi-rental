import { Component } from '@angular/core';
import { DriverService } from '../../../cores/services/driver.service';
import { RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-assigned-trips',
  imports: [CommonModule],
  templateUrl: './assigned-trips.component.html',
  styleUrl: './assigned-trips.component.css'
})
export class AssignedTripsComponent {

  assignedBookings: any[] = [];
  loading = true;
  message: string = '';
  alertClass: string = '';

  constructor(private driverService: DriverService ) {}

  ngOnInit(): void {
    this.fetchAssignedBookings();
  }

  fetchAssignedBookings() {
    this.driverService.getAssignedBookingsForDriver().subscribe({
      next: (res) => {
        console.log(res);
        this.assignedBookings = res.data;
        this.loading = false;
      },
      error: (err) => {
        // console.error('Error fetching driver bookings:', err);
        this.loading = false;
        this.message = 'Failed to fetch assigned trips';
        this.alertClass = 'alert-danger';
      }
    });
  }

  updateTripStatus(bookingId: string, status: string) {
    this.driverService.updateTripStatus(bookingId, status).subscribe({
      next: (res) => {
        this.message = 'Trip status updated successfully.';
        this.alertClass = 'alert-success';
        this.fetchAssignedBookings();
      },
      error: (err) => {
        this.message = err.error.message || 'Failed to update trip status.';
        this.alertClass = 'alert-danger';
      }
    });
  }
}
