import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { BookingService } from '../../../../cores/services/booking.service';

@Component({
  selector: 'app-manage-booking',
  imports: [CommonModule],
  templateUrl: './manage-booking.component.html',
  styleUrl: './manage-booking.component.css'
})
export class ManageBookingComponent {

  bookings: any[] = [];
  loading = true;

  constructor(private bookingService: BookingService) {}

  ngOnInit(): void {
    this.fetchBookings();
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
}


