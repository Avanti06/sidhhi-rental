import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../../cores/auth.service';
import { CommonModule } from '@angular/common';

declare var bootstrap: any;

@Component({
  selector: 'app-login',
  imports: [ReactiveFormsModule,CommonModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent implements OnInit {

  loginForm!: FormGroup;

  errorMessage = '';

  message: string = '';
messageClass: string = '';

  @Output() switchToRegisterEvent = new EventEmitter<void>();

  constructor(private fb: FormBuilder,private authService: AuthService, private router: Router) {}

  ngOnInit() {
    this.loginForm = this.fb.group({
      email: ['',[Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
    })
  }

  // login() {
  //   if(this.loginForm.valid){
  //   this.authService.login(this.loginForm.value).subscribe(
  //     (response) => {
  //       if(response.token) {
  //       localStorage.setItem('token', response.token);
  //       const role = this.authService.getUserRole();
  //       localStorage.setItem('role', role || '');
        
  //       if (role === 'admin') {
  //         this.router.navigate(['/admin-dashboard']);
  //       } else if (role === 'provider') {
  //         this.router.navigate(['/provider-dashboard']);
  //       } else {
  //         this.router.navigate(['/user-dashboard']);
  //       }
        
      
  //     }
  //     },
  //     (error) => {
  //       this.errorMessage = 'Invalid email or password';
  //     }
  //   );
  // } else {
  //   console.log("Invalid Form Data:", this.loginForm.value);
  //   this.errorMessage = "Please fill in valid email & password.";
  // }
  // }

  login() {
    if (this.loginForm.valid) {
      console.log("📤 Sending request:", this.loginForm.value);
      
      this.authService.login(this.loginForm.value).subscribe(
        (response) => {
          console.log("✅ Response:", response);

          if (response.token) {
            localStorage.setItem('token', response.token);
            const role = this.authService.getUserRole();
            localStorage.setItem('role', role || '');

            this.message = 'Login Successful! Redirecting...';
            this.messageClass = 'alert alert-success';

            // Close the modal
            const modalElement = document.getElementById('authModal');
            if (modalElement) {
              const modalInstance = bootstrap.Modal.getInstance(modalElement);
              modalInstance?.hide();
            }
  

            setTimeout(() => {
              let dashboardRoute = '/';

              if (role === 'admin') {
                dashboardRoute = '/admin-dashboard';
              } else if (role === 'provider') {
                dashboardRoute = '/provider-dashboard';
              } else if (role === 'driver') {
                dashboardRoute = '/driver-dashboard';
              }else {
                dashboardRoute = '/';
              }

              this.router.navigateByUrl(dashboardRoute).then(() => {
                window.location.href = dashboardRoute; // **Forces reload on dashboard only**
              });
            }, 1000);
          }
        },
        (error) => {
           
          this.message = 'Login Failed. Invalid email or password.';
          this.messageClass = 'alert-danger';
         
        }
      );
    } else {
      // console.log("❌ Invalid Form Data:", this.loginForm.value);
      this.message = 'Please enter a valid email & password.';
      this.messageClass = 'alert-warning';
  
    }
  }

  


  switchToRegister() {
    this.switchToRegisterEvent.emit(); // Emit event to parent component
  }
}


