import { Component } from '@angular/core';
import { RentalService } from '../../../cores/services/rental.service';
import { Router, RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-rentals',
  imports: [RouterLink,CommonModule],
  templateUrl: './rentals.component.html',
  styleUrl: './rentals.component.css'
})
export class RentalsComponent {

  rentals: any[] = [];

  constructor(private rentalService: RentalService, private router: Router) {}

  ngOnInit(): void {
    this.fetchRentals();
  }

  bookRental(rental: any) {
    // console.log('Navigating to book rental :', rental); // Debugging
     
    localStorage.setItem('selectedRental', JSON.stringify(rental));
    this.router.navigate(['book-rental', rental._id]);
  }
  

  fetchRentals() {
    this.rentalService.getAllRentalsForCustomers().subscribe(
      (data) => {
        console.log("Fetched Rentals:", data);
        this.rentals = data;
      },
      (error) => {
        console.error('Error fetching rentals:', error);
      }
    );
  }
}
