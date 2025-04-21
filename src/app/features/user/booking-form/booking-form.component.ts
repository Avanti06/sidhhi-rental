import { CommonModule } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import {  FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';

import {  ActivatedRoute, Router } from '@angular/router';
import { BookingSummaryComponent } from '../booking-summary/booking-summary.component';
import { RentalService } from '../../../cores/services/rental.service';
import { start } from '@popperjs/core';


declare var bootstrap: any;



@Component({
  selector: 'app-booking-form',
  imports: [ReactiveFormsModule,CommonModule, BookingSummaryComponent],
  templateUrl: './booking-form.component.html',
  styleUrl: './booking-form.component.css'
})
export class BookingFormComponent implements OnInit{

  bookingForm!: FormGroup;
  rentalId!:string;
  showSummaryModal:boolean  = false;
  pricePerDay: number = 0;
  selectedRental: any; // Rental data from parent component
  isRoundTrip: boolean = false;

  constructor(private fb: FormBuilder,
    private route : ActivatedRoute,
    private router: Router,
    private rentalService: RentalService
  ) {}

  ngOnInit(): void {
     
     // 1. Initialize form
     this.bookingForm = this.fb.group({
      tripType: ['one-way', Validators.required],
      pickupLocation: ['', Validators.required],
      dropLocation: ['', Validators.required],
      startDate: ['', Validators.required],
      endDate: ['']
    });
   
      // 2. Toggle endDate validator based on tripType
    this.bookingForm.get('tripType')!.valueChanges.subscribe(type => {
      const endDate = this.bookingForm.get('endDate')!;
      this.isRoundTrip = type === 'round-trip';
      if (this.isRoundTrip) {
        endDate.setValidators(Validators.required);
      } else {
        endDate.clearValidators();
        endDate.reset();
      }
      endDate.updateValueAndValidity();
    });

    // 3. Read rentalId from route and fetch details
    this.route.paramMap.subscribe(params => {
      this.rentalId = params.get('rentalId')!;
      this.fetchRentalDetails();
    });
  }

  private fetchRentalDetails(): void {
    this.rentalService.getRentalById(this.rentalId).subscribe({
      next: rental => {
        // console.log("rental : ", rental);
        this.selectedRental = rental;
        this.pricePerDay = rental.price;
      },
      error: err => {
        console.error('Error fetching rental:', err);
      }
    });
  }

  
 // ✅ Open Booking Summary
 openBookingSummary(): void {
  if (this.bookingForm.invalid ) {
    this.bookingForm.markAllAsTouched();
    return;
  } 
  this.showSummaryModal = true;
}



get bookingSummaryData() {
  const { tripType, pickupLocation, dropLocation, startDate, endDate } = this.bookingForm.value;
    const days = this.calculateDays(tripType, startDate, endDate);
    const totalPrice = days * this.pricePerDay;
    const bookingAmount = totalPrice * 0.2;
    const remainingAmount = totalPrice - bookingAmount;

    return {
      rentalId: this.rentalId,
      tripType,
      pickupLocation,
      dropLocation,
      startDate,
      endDate: this.isRoundTrip ? endDate : null,
      days,
      pricePerDay: this.pricePerDay,
      totalPrice,
      bookingAmount,
      remainingAmount 
    };
  }


private calculateDays(type: string, start: string, end: string): number {
  if (type !== 'round-trip') {
    return 1;
  }
  const startDate = new Date(start);
  const endDate = new Date(end);
  const diffMs = endDate.getTime() - startDate.getTime();
  return Math.floor(diffMs / (1000 * 3600 * 24));
}



closeSummaryModal():void {
  this.showSummaryModal = false;
}
}

