import { Component, OnInit } from '@angular/core';
import { RentalService } from '../../../../cores/services/rental.service';
import { ActivatedRoute, Route, Router, RouterLink } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import * as bootstrap from 'bootstrap';

@Component({
  selector: 'app-edit-rental',
  imports: [ReactiveFormsModule],
  templateUrl: './edit-rental.component.html',
  styleUrl: './edit-rental.component.css'
})
export class EditRentalComponent implements OnInit{
  
  rentalForm!: FormGroup;
  rentalId: string = '';
  selectedFile: File | null = null;

  constructor(
    private route: ActivatedRoute,
    private fb: FormBuilder,
    private rentalService: RentalService, 
    private router: Router, 
    private http: HttpClient){}

    ngOnInit(): void {
      this.rentalId = this.route.snapshot.paramMap.get('id') || '';
      this.initializeForm();
      this.loadRentalDetails();
    }
  
  initializeForm() {
    this.rentalForm = this.fb.group({
      name: ['', Validators.required],
      category: ['', Validators.required],
      price: ['', Validators.required],
      location: ['', Validators.required],
      description: ['', Validators.required],
      availability: [true], // Default true
      image: [null] // Handle image upload
    });
  }

  loadRentalDetails() {
    this.rentalService.getRentalById(this.rentalId).subscribe({
      next: (rental) => {
        this.rentalForm.patchValue({
          name: rental.name,
          category: rental.category,
          price: rental.price,
          location: rental.location,
          description: rental.description,
          availability: rental.availability
        });
      },
      error: () => {
        alert('Failed to load rental details');
      }
    });
  }

  onFileSelected(event: any) {
    this.selectedFile = event.target.files[0];
  }

  cancelEdit() {
    this.router.navigate(['/admin-dashboard/manage-vehicals']);
  }

  updateRental() {
    const formData = new FormData();
    formData.append('name', this.rentalForm.get('name')?.value);
    formData.append('category', this.rentalForm.get('category')?.value);
    formData.append('price', this.rentalForm.get('price')?.value);
    formData.append('location', this.rentalForm.get('location')?.value);
    formData.append('description', this.rentalForm.get('description')?.value);
    formData.append('availability', this.rentalForm.get('availability')?.value);

    if (this.selectedFile) {
      formData.append('image', this.selectedFile);
    }

    this.rentalService.updateRental(this.rentalId, formData).subscribe({
      next: () => {
          // ✅ Show Bootstrap Modal
          let successModal = new bootstrap.Modal(document.getElementById('successModal')!);
          successModal.show();
        this.router.navigate(['/admin-dashboard/manage-vehicals']); // Redirect after update
      },
      error: () => {
        alert('Failed to update rental');
      }
    });
  }
}
