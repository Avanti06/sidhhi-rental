import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import * as bootstrap from 'bootstrap';
import { RentalService } from '../../../../cores/services/rental.service';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-add-rentals',
  imports: [ReactiveFormsModule,CommonModule],
  templateUrl: './add-rentals.component.html',
  styleUrl: './add-rentals.component.css'
})
export class AddRentalsComponent {
  rentalForm: FormGroup;
  selectedFiles: File | null = null;;
  modalInstance: any;

  isModalVisible = false;
  modalTitle = '';
  modalMessage = '';
  

  constructor(private fb: FormBuilder,private http: HttpClient,private rentalService: RentalService) {
    this.rentalForm = this.fb.group({
      name: ['', Validators.required],
      category: ['Car', Validators.required],
      price: [null, [Validators.required, Validators.min(1)]],
      location: ['', Validators.required],
      description: ['', Validators.required],
      
    });
  }

  ngOnInit() {
    const modalElement = document.getElementById('rentalSuccessModal');
    if (modalElement) {
      this.modalInstance = new bootstrap.Modal(modalElement);
    }
  }

  onFileSelect(event: any) {
    if (event.target.files.length > 0) {
      this.selectedFiles = event.target.files[0]; // Assign selected file
    }
  }

  onSubmit() {
    if (this.rentalForm.invalid || !this.selectedFiles) {
    this.showModal('all feild', 'please fill all field and image');
    return;
    }
    
    const formData = new FormData();
    Object.keys(this.rentalForm.value).forEach((key) => {
      formData.append(key, this.rentalForm.value[key]);
    });
    formData.append('image', this.selectedFiles);
     
    this.rentalService.addRental(formData).subscribe(
       Response =>{
        this.showModal('Success', 'Rental added successfully!');
       this.rentalForm.reset();
       },
       error => {
        this.showModal('Error', error.error.message || 'Failed to add rental.');
       }
);
}

    showModal(title: string, message: string) {
      this.modalTitle = title;
      this.modalMessage = message;

      this.isModalVisible = true;
    }

    closeModal() {
      this.isModalVisible = false;
    }

}
