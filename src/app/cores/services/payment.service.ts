import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class PaymentService {
 
  private baseUrl = `${environment.API_URL}/payment`;
  constructor(private http: HttpClient) { }

  // ✅ Create Razorpay Order
  createOrder(amount: number, bookingId: string) {
    return this.http.post(`${this.baseUrl}/create-order`, {
      amount,
      bookingId,
    });
  }

  // ✅ Verify Payment
  verifyPayment(paymentData: any) {
    return this.http.post(`${this.baseUrl}/verify-payment`, paymentData);
  }
}
