import { Component } from '@angular/core';
import { Booking } from '../../models/booking.model';
import { BookingService } from '../../../cores/services/booking.service';
import { CommonModule } from '@angular/common';
import { PaymentService } from '../../../cores/services/payment.service';
import { environment } from '../../../../environments/environment';
import { InvoiceService } from '../../../cores/services/invoice.service';


declare var Razorpay: any;

@Component({
  selector: 'app-my-booking',
  imports: [CommonModule],
  templateUrl: './my-booking.component.html',
  styleUrl: './my-booking.component.css'
})
export class MyBookingComponent {

  bookings: Booking[] = [];

  constructor(
    private invoiceService: InvoiceService,
    private bookingService: BookingService,
    private paymentService: PaymentService) {}

  ngOnInit(): void {
    this.fetchBookings();
  }

  fetchBookings() {
    this.bookingService.getMyBookings().subscribe({
      next: (res: any) => {
        this.bookings = res.bookings;
      },
      error: (err) => {
        console.error('Error fetching bookings', err);
      }
    });
  }

  payRemaining(booking: Booking) {
    // Call API to create Razorpay order for remaining amount
    this.bookingService.createPaymentOrder(booking._id).subscribe(
      (response) => {
        const orderId = response.order.id;

        // Razorpay payment options
        const razorpayOptions = {
          key: environment.razorpayKey, // Replace with your Razorpay Key
          amount: booking.remainingAmount * 100, // Convert to paise
          currency: 'INR',
          name: 'Sidhi Tour and Travels',
          description: `Remaining Payment for Booking ID: ${booking._id}`,
          order_id: orderId,
          handler: (paymentResponse: any) => {
            // Once payment is successful, confirm it on the backend
            const paymentDetails = {
              razorpay_order_id: paymentResponse.razorpay_order_id,
              razorpay_payment_id: paymentResponse.razorpay_payment_id,
              razorpay_signature: paymentResponse.razorpay_signature,
            };

            // Confirm the payment
            this.paymentService.confirmPayment(booking._id, paymentResponse.razorpay_payment_id).subscribe(
              (confirmationResponse) => {
                console.log("confirm response: ",confirmationResponse);
                alert('Payment successful! Booking confirmed.');
                this.fetchBookings(); // Reload bookings after successful payment
              },
              (error) => {
                alert('Payment verification failed.');
              }
            );
          },
          theme: {
            color: '#F37254', // Customize your Razorpay checkout color
          },
        };

        // Trigger Razorpay checkout modal
        const razorpay = new Razorpay(razorpayOptions);
        razorpay.open();
      },
      (error) => {
        alert('Failed to initiate payment.');
      }
    );
  }

  generateInvoice(bookingId: string) {
    this.invoiceService.downloadInvoice(bookingId).subscribe({
      next: (res: any) => {
        console.log("Backend response: ", res);
        const filePath = res.filePath;
        // Check if filePath is valid before proceeding
      if (!filePath) {
        console.error('File path is not defined');
        alert('Failed to generate invoice. Please try again later.');
        return;
      }

        const fileName = filePath.split('/').pop();

        // Construct full URL if backend is on a different host
        const downloadUrl = `http://localhost:5000${filePath}`;

        const link = document.createElement('a');
        link.href = downloadUrl;
        link.download = fileName || 'invoice.pdf';
        link.target = '_blank';
        link.click();
      },
      error: (err) => {
        console.error('Invoice download failed:', err);
        alert('Failed to generate invoice. Try again.');
      },
    });
  }

}
