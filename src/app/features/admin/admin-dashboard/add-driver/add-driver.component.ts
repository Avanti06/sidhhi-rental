import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthService } from '../../../../cores/auth.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-add-driver',
  imports: [ReactiveFormsModule,CommonModule],
  templateUrl: './add-driver.component.html',
  styleUrl: './add-driver.component.css'
})
export class AddDriverComponent {

  driverForm: FormGroup;
  selectedFile: File | null = null;
  isLoading = false;

  constructor(
    private fb: FormBuilder,
    private authService: AuthService) {
      this.driverForm = this.fb.group({
        name: ['', Validators.required],
        email: ['', [Validators.required, Validators.email]],
        password: ['', [Validators.required, Validators.minLength(6)]],
        phoneNo: ['', [Validators.required, Validators.pattern('^[0-9]{10}$')]],
        licenseNumber: ['', Validators.required],
        vehicleType: ['', Validators.required],
        
      });
    }

     // File Selection Event
     onFileSelected(event: any) {
      if (event.target.files.length > 0) {
        this.selectedFile = event.target.files[0]; // Assign selected file
      }
    }

   // Submit Form
   addDriver() {
    if (this.driverForm.invalid || !this.selectedFile) {
      alert('Please fill all required fields.');
      return;
    }

    this.isLoading = true;
    const formData = new FormData();
    Object.keys(this.driverForm.value).forEach(key => {
      formData.append(key, this.driverForm.value[key]);
    });
    formData.append('image', this.selectedFile);

    const token = localStorage.getItem('token') || ''; // Get admin token

    this.authService.addDriver(formData).subscribe(
      (response) => {
        alert('Driver added successfully!');
        this.driverForm.reset();
        this.selectedFile = null;
      },
      (error) => {
        alert(error.error.message || 'Failed to add driver');
      }
    ).add(() => this.isLoading = false);
  }
}
