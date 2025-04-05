import { CommonModule } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import {  FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';

import {  ActivatedRoute, Router } from '@angular/router';
import { BookingSummaryComponent } from '../booking-summary/booking-summary.component';


declare var bootstrap: any;



@Component({
  selector: 'app-booking-form',
  imports: [ReactiveFormsModule,CommonModule, BookingSummaryComponent],
  templateUrl: './booking-form.component.html',
  styleUrl: './booking-form.component.css'
})
export class BookingFormComponent implements OnInit{

  bookingForm: FormGroup;
  showSummaryModal:boolean  = false;
  pricePerDay: number = 0;
  selectedRental: any; // Rental data from parent component
  isRoundTrip: boolean = false;

  constructor(private fb: FormBuilder,
    private route : ActivatedRoute,
    private router: Router
  ) {

    this.bookingForm = this.fb.group({
      tripType: ['one-way', Validators.required],
      pickupLocation: ['', Validators.required],
      dropLocation: ['', Validators.required],
      startDate: ['', Validators.required],
      endDate: ['']
    });
  }

  ngOnInit() {
     
    console.log()
     // Get rental data from navigation state
     const navigation = this.router.getCurrentNavigation();

     if (navigation?.extras.state?.['rentalData']) {
      this.selectedRental = navigation.extras.state['rentalData'];
      localStorage.setItem('selectedRental', JSON.stringify(this.selectedRental));
    } else {
      const storedRental = localStorage.getItem('selectedRental');
      this.selectedRental = storedRental ? JSON.parse(storedRental) : null;
    }

    this.route.queryParams.subscribe(params => {
      this.pricePerDay = params['price'] ? +params['price'] : 0; // Convert string to number
    });

    console.log("🚀 Debug: selectedRental:", this.selectedRental);

    // 🔹 Update End Date visibility dynamically
    this.bookingForm.get('tripType')?.valueChanges.subscribe(value => {
      this.isRoundTrip = value === 'round-trip';
      if (!this.isRoundTrip) {
        this.bookingForm.patchValue({ endDate: '' });
      }
    });
  }
  
 // ✅ Open Booking Summary
 openBookingSummary() {
  if (this.bookingForm.valid ) {
    this.showSummaryModal = true;
  } else {
    alert("Please fill all details");
  }
}



get bookingSummaryData() {
  return {
    ...this.bookingForm.value,  // Spread operator works in TypeScript
    vehicleId: this.selectedRental?._id
  };
}



closeSummaryModal() {
  this.showSummaryModal = false;
}
}
