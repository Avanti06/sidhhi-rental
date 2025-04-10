import { Component } from '@angular/core';
import { Booking } from '../../models/booking.model';
import { BookingService } from '../../../cores/services/booking.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-my-booking',
  imports: [CommonModule],
  templateUrl: './my-booking.component.html',
  styleUrl: './my-booking.component.css'
})
export class MyBookingComponent {

  bookings: Booking[] = [];

  constructor(private bookingService: BookingService) {}

  ngOnInit(): void {
    this.fetchBookings();
  }

  fetchBookings() {
    this.bookingService.getMyBookings().subscribe({
      next: (res: any) => {
        this.bookings = res.bookings;
      },
      error: (err) => {
        console.error('Error fetching bookings', err);
      }
    });
  }

  payRemaining(booking: Booking) {
    // TODO: Trigger Razorpay flow for remainingAmount using booking._id
    alert(`Pay ₹${booking.remainingAmount} for booking ID: ${booking._id}`);
  }
}
