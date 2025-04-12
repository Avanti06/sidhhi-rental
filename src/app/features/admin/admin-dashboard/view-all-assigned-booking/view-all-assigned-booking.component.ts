import { Component } from '@angular/core';
import { BookingService } from '../../../../cores/services/booking.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-view-all-assigned-booking',
  imports: [CommonModule],
  templateUrl: './view-all-assigned-booking.component.html',
  styleUrl: './view-all-assigned-booking.component.css'
})
export class ViewAllAssignedBookingComponent {
 
  assignedBookings: any[] = [];

  constructor(private bookingService: BookingService) {}

  ngOnInit(): void {
    this.fetchAssignedBookings();
  }

  fetchAssignedBookings() {
    this.bookingService.getAllAssignedBookings().subscribe({
      next: (res) => {
        console.log(res);
        this.assignedBookings = res;
      },
      error: (err) => {
        console.error(err);
        alert('Failed to load assigned bookings');
      }
    });
  }
}
