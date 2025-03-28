import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class BookingService {

  private baseUrl = `${environment.API_URL}/booking`;

  constructor(private http: HttpClient) { }

  // ✅ Create a new booking
  createBooking(bookingData: any, token: string): Observable<any> {
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    return this.http.post(`${this.baseUrl}/create`, bookingData, { headers });
  }


  // ✅ Verify payment
  verifyPayment(paymentData: any): Observable<any> {
    return this.http.post(`${this.baseUrl}/verify-payment`, paymentData);
  }
}
