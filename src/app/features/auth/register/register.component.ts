import { CommonModule } from '@angular/common';
import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthService } from '../../../cores/auth.service';

declare var bootstrap: any;

@Component({
  selector: 'app-register',
  imports: [CommonModule,ReactiveFormsModule],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent implements OnInit {

  @Output() switchToLoginEvent = new EventEmitter<void>();
    
      
    registerForm!: FormGroup;
    isProvider = false;
    selectedFile: File | null = null;
    modalType = 'sign up';
  
    constructor(private fb: FormBuilder, private authService: AuthService) {}
     
    ngOnInit() {
    this.registerForm = this.fb.group({
        name: ['', Validators.required],
        email: ['', [Validators.required, Validators.email]],
        password: ['', [Validators.required, Validators.minLength(6)]],
        phoneNo: ['', Validators.required],
  
      });

       // Watch for role changes
    this.registerForm.get('role')?.valueChanges.subscribe(role => {
      this.isProvider = role === 'provider';
    });
    }
    
  
    onRoleChange() {
      this.isProvider = this.registerForm.value.role === 'provider';

      if (this.isProvider) {
        this.registerForm.get('company_name')?.setValidators(Validators.required);
        this.registerForm.get('gst_number')?.setValidators(Validators.required);
      } else {
        this.registerForm.get('company_name')?.clearValidators();
        this.registerForm.get('gst_number')?.clearValidators();
      }
  
      this.registerForm.get('company_name')?.updateValueAndValidity();
      this.registerForm.get('gst_number')?.updateValueAndValidity();
    }
  
    onFileSelect(event: any) {
      if (event.target.files.length > 0) {
        this.selectedFile = event.target.files[0];
      }
    }
  
    register() {
      if (this.registerForm.invalid) return;
      
      const userData = {
        name: this.registerForm.value.name,
        email: this.registerForm.value.email,
        phoneNo: this.registerForm.value.phoneNo,
        password: this.registerForm.value.password
      };
      
  
      this.authService.registerUser(userData).subscribe({
        next: (res) => {
          alert('Registration Successful!');

          //clear the form after successful regitration
          this.registerForm.reset();

          // Close the modal - assuming the modal is controlled via Bootstrap modal
      const modal = document.getElementById('registerModal'); // Make sure you replace 'registerModal' with your actual modal ID
      if (modal) {
        const modalInstance = bootstrap.Modal.getInstance(modal);
        modalInstance.hide(); // This closes the modal
      }
        },
        error: (err) => {
          console.error(err);
          alert('Registration Failed.');
        }
      });
    
    }
  
  
    switchToLogin() {
      this.modalType = 'login';
      this.switchToLoginEvent.emit(); // Emit event to parent component
    }
  }
  