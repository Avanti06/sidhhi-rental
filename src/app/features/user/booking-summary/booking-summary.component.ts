import { Component, EventEmitter, Input, Output } from '@angular/core';
import { PaymentService } from '../../../cores/services/payment.service';
import { Router } from '@angular/router';
import { BookingService } from '../../../cores/services/booking.service';
import { environment } from '../../../../environments/environment';

declare var Razorpay: any;

@Component({
  selector: 'app-booking-summary',
  imports: [],
  templateUrl: './booking-summary.component.html',
  styleUrl: './booking-summary.component.css'
})
export class BookingSummaryComponent {
  @Input() bookingData: any;
  @Input() pricePerDay: number = 0;
  @Output() close = new EventEmitter<void>();

   token : string = '';
  totalAmount: number = 0;
  bookingAmount: number = 0;
  remainingAmount: number = 0;

  constructor(private paymentService: PaymentService,
    private router: Router, private bookingService: BookingService) {}

  ngOnInit() {
    console.log(this.bookingData);
    this.token = localStorage.getItem('token') || '';
    this.calculatePrice();
  }
  calculatePrice() {
    if (!this.bookingData || !this.bookingData?.startDate || !this.bookingData?.endDate) {
      console.error("Missing booking dates!");
      return;
    }
    const startDate = new Date(this.bookingData.startDate);
    const endDate = new Date(this.bookingData.endDate);
    const days = Math.ceil((endDate.getTime() - startDate.getTime()) / (1000 * 60 * 60 * 24));

    if (days <= 0) {
      console.warn("Invalid date range selected");
      return;
    }

    this.totalAmount = (this.pricePerDay || 0) * days;
    this.bookingAmount = this.totalAmount * 0.2;
    this.remainingAmount = this.totalAmount - this.bookingAmount;
  }

  // ✅ Proceed to Razorpay Payment with API Response Handling
proceedToPayment() {
  if (!this.token) {
    alert("User not logged in!");
    return;
  }


  console.log("🚀 Debug: Booking Data:", this.bookingData);
  console.log("🚀 Debug: Total Amount:", this.totalAmount);
  console.log("🚀 Debug: Booking Amount:", this.bookingAmount);
  console.log("🚀 Debug: Remaining Amount:", this.remainingAmount);

  if (!this.totalAmount || this.totalAmount <= 0) {
    alert("Error: Invalid total amount!");
    return;
  }

  const bookingRequest = {
    ...this.bookingData,
    totalAmount: this.totalAmount,
    bookingAmount: this.bookingAmount,
    remainingAmount: this.remainingAmount
  };

  console.log("🚀 Debug: Booking Request Payload:", bookingRequest);

  // 1️⃣ First, create a booking in the backend to get `bookingId`
  this.bookingService.createBooking(bookingRequest, this.token).subscribe({
    next: (bookingResponse: any) => {

      console.log("🚀 Debug: Booking API Response:", bookingResponse);
      
      if (bookingResponse?.booking?._id) {
        const bookingId = bookingResponse.booking._id;
        this.createRazorpayOrder(bookingId);
      } else {
        alert("Failed to create booking!");
      }
    },
    error: (err) => {
      console.error("Booking API Error:", err);
      alert("Error creating booking. Try again later.");
    }
  });
}

// ✅ Create Razorpay Order
createRazorpayOrder(bookingId: string) {
  this.paymentService.createOrder(this.bookingAmount, bookingId).subscribe({
    next: (orderResponse: any) => {
      console.log("🚀 Debug: Razorpay Order Response:", orderResponse);
      if (orderResponse?.id) {
        this.openRazorpay(orderResponse);
      } else {
        alert("Failed to generate payment order!");
      }
    },
    error: (err) => {
      console.error("Payment API Error:", err);
      alert("Error while processing payment. Try again later.");
    }
  });
}


  openRazorpay(order: any) {
    const options = {
      key: environment.razorpayKey,
      amount: order.amount,
      currency: order.currency,
      name: 'Sidhhi Rental ',
      description: 'Booking Payment',
      order_id: order.id,
      handler: (response: any) => {
        console.log("Payment Success:", response);
        this.verifyPayment(response);
      }
    };
     
    const rzp = new Razorpay(options);
    rzp.open();
  }

 // ✅ Step 4: Verify Payment & Update Booking Status
 verifyPayment(paymentData: any) {
  this.paymentService.verifyPayment(paymentData).subscribe({
    next: (response) => {
      const res = response as { success: boolean; message?: string};
      if (res.success) {
        alert("Payment Successful!");
        this.close.emit();
        this.router.navigate(['/bookings']);  // Redirect to bookings page
      } else {
        alert("Payment Verification Failed!");
      }
    },
    error: (err) => {
      console.error("Payment Verification Error:", err);
      alert("Error verifying payment.");
    }
  });
}
}
