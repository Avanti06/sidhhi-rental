import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RentalService } from '../../../../cores/services/rental.service';
import { Router, RouterLink } from '@angular/router';
declare var bootstrap: any; 

@Component({
  selector: 'app-manage-vehicles',
  imports: [CommonModule],
  templateUrl: './manage-vehicles.component.html',
  styleUrl: './manage-vehicles.component.css'
})
export class ManageVehiclesComponent {

  rentals: any[] = [];
  rentalId!: string;
  rentalToDelete: string = '';
  

  constructor(private rentalService: RentalService, private router: Router) {}

  ngOnInit(): void {
    const token = localStorage.getItem('token');
    if (!token) {
      alert('Unauthorized! Please log in.');
      this.router.navigate(['/login']); // Redirect to Login Page
    } else {
      this.getAllRentals();
    }
  }

  getAllRentals() {
    this.rentalService.getAllRentals().subscribe({
      next: (data) => {
        this.rentals = data;
      },
      error: (err) => {
        console.error('Error fetching rentals:', err);
      }
    });
  }
  
  editRental(rentalId: string) {
    console.log('Navigating to edit rental with ID:', rentalId); // Debugging
    this.router.navigate(['/admin-dashboard/edit-rental', rentalId]);
  }
  
  
  // Open modal and set rental ID
  openModal(rentalId: string) {
    this.rentalToDelete = rentalId;
    const modal = new bootstrap.Modal(document.getElementById('deleteModal'));
    modal.show();
  }


  // Confirm and delete rental
  confirmDelete() {
    if (!this.rentalToDelete) return;

    this.rentalService.deleteRental(this.rentalToDelete).subscribe({
      next: (response) => {
        console.log('Delete response:', response); // Log success response
        this.rentals = this.rentals.filter(r => r._id !== this.rentalToDelete);
        alert('Rental deleted successfully');
      },
      error: (error) => {
        console.error('Delete failed:', error); // Log error details
        alert(`Failed to delete rental: ${error.error.message}`);
      }
    });
}
}
