import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { BookingService } from '../../../../cores/services/booking.service';
import { DriverService } from '../../../../cores/services/driver.service';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-manage-booking',
  imports: [CommonModule,FormsModule],
  templateUrl: './manage-booking.component.html',
  styleUrl: './manage-booking.component.css'
})
export class ManageBookingComponent {

  bookings: any[] = [];
  selectedDriver : { [bookingId: string]: string } = {};
  drivers: any[]= [];
  loading = true;

  constructor(private bookingService: BookingService, private driverService: DriverService) {}

  ngOnInit(): void {
    this.fetchBookings();
    this.loadDrivers();
  }

  fetchBookings(): void {
    this.bookingService.getUpcomingBookings().subscribe({
      next: (res:any) => {
        this.bookings = res.bookings;
        this.loading = false;
      },
      error: (err:any) => {
        console.error('Error fetching bookings:', err);
        this.loading = false;
      }
    });
  }

  loadDrivers() {
    this.driverService.getAllDrivers().subscribe((res: any) => {
      console.log(res);
      this.drivers = res;
      console.log(this.drivers);
    });
  }

  approveBooking(bookingId: string) {
    this.bookingService.approveBooking(bookingId).subscribe({
      next: (res) => {
        alert('Booking approved!');
        this.fetchBookings(); // reload bookings
      },
      error: (err) => console.error(err)
    });
  }

  rejectBooking(bookingId: string) {

    this.bookingService.rejectBooking(bookingId).subscribe({
      next: (res: any) => {
        console.log("response", res);
        alert('Booking rejected.');
        this.fetchBookings(); // reload bookings
      },
    
      error: (err: any) => {
      console.log(err);
      }
    });
  }

  assignDriver(bookingId: string) {
    const driverId = this.selectedDriver[bookingId];
  
    if (!driverId) {
      alert('❗ Please select a driver before assigning.');
      return;
    }
  
    this.driverService.assignDriver(bookingId, driverId).subscribe({
      next: (res) => {
        const message = '✅ Driver assigned successfully.';
        alert(message);
        this.fetchBookings(); // Refresh bookings after assignment
      },
      error: (error) => {
        const errorMessage =
          error?.error?.message || '❌ An error occurred while assigning the driver.';
        alert(errorMessage);
        console.error('Driver assignment failed:', error);
      }
    });
  }
 
}


