import { CommonModule } from '@angular/common';
import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthService } from '../../../cores/auth.service';

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
        role: ['user', Validators.required],
        company_name: [''],
        gst_number: [''],
        company_logo: ['']
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
      const formData = new FormData();
      Object.entries(this.registerForm.value).forEach(([key, value]) => {
        if (value !== null && value !== undefined) { // ✅ Avoid appending null/undefined
          if (typeof value === 'object' && key === 'company_logo') { // ✅ Handle File Uploads
            formData.append(key, this.selectedFile as File);
          } else {
            formData.append(key, value as string);
          }
        }
      });
  
      if (this.selectedFile) {
        formData.append('company_logo', this.selectedFile);
      }
  
      this.authService.register(formData).subscribe({
        next: (res) => {
          alert('Registration Successful! Awaiting Admin Approval.');
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
  