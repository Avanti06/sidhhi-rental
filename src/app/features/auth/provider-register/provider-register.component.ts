import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';

declare var bootstrap: any;

@Component({
  selector: 'app-provider-register',
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './provider-register.component.html',
  styleUrl: './provider-register.component.css'
})
export class ProviderRegisterComponent implements OnInit{
  providerForm!: FormGroup;

  constructor(private fb: FormBuilder) {}

  ngOnInit() {
    this.providerForm = this.fb.group({
      fullName: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      phone: ['', [Validators.required, Validators.pattern('^[0-9]{10}$')]],
      companyName: ['', Validators.required],
      gstNumber: ['', Validators.required],
      companyAddress: ['', Validators.required],
      password: ['', [Validators.required, Validators.minLength(6)]],
      confirmPassword: ['', Validators.required],
      terms: [false, Validators.requiredTrue]
    });
  }

  onSubmit() {
    if (this.providerForm.valid) {
      const providerData = this.providerForm.value;

      // Get existing providers from local storage
      let providers = JSON.parse(localStorage.getItem('providers') || '[]');

      // Add new provider data
      providers.push(providerData);

      // Save to local storage
      localStorage.setItem('providers', JSON.stringify(providers));

      //show success modal
      let successModal = new bootstrap.Modal(document.getElementById('successModal'));
      successModal.show();

      // Clear the form
      this.providerForm.reset();
    }
}

onFileSelect(event: any) {
  const file = event.target.files[0];
  console.log('Selected file:', file);
}
}
