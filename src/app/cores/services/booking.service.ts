import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Booking } from '../../features/models/booking.model';

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

  getUpcomingBookings(): Observable<any> {
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);

    return this.http.get(`${this.baseUrl}/admin/upcoming`, { headers });
  }

  getMyBookings(): Observable<Booking[]> {
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`)
    
    return this.http.get<Booking[]>(`${this.baseUrl}/my-booking`, { headers });
  }

  approveBooking(bookingId: string) {
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);

    return this.http.put(`${this.baseUrl}/approve/${bookingId}`, {} , { headers });
  }
  
  rejectBooking(bookingId: string) {
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);

    return this.http.put(`${this.baseUrl}/reject/${bookingId}`, {} , { headers });
  }

  getAllAssignedBookings() {
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);

    return this.http.get<any[]>(`${this.baseUrl}/assigned/all`,{ headers });
  }

  // Method to create Razorpay order for remaining amount
  createPaymentOrder(bookingId: string): Observable<any> {
    return this.http.post<any>(`${this.baseUrl}/pay-remaining-amount`, { bookingId });
  }
  
  updateTripStatus(tripId: string, status: string) {
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);

    return this.http.put(`${this.baseUrl}/update-trip-status/${tripId}`, { tripStatus: status }, { headers });
  }
} 
