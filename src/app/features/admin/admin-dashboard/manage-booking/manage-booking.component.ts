import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';

@Component({
  selector: 'app-manage-booking',
  imports: [],
  templateUrl: './manage-booking.component.html',
  styleUrl: './manage-booking.component.css'
})
export class ManageBookingComponent {

  bookings = [
    { id: 1, customer: 'Rahul Sharma', vehicle: 'Toyota Innova', date: '2025-03-18' },
    { id: 2, customer: 'Priya Verma', vehicle: 'Honda City', date: '2025-03-19' }
  ];
}
