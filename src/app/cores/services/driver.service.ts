import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class DriverService {
 
  private apiUrl = `${environment.API_URL}/driver`;

  private driverUrl = `${environment.API_URL}/admin`;

  constructor(private http: HttpClient) { }

  getAllDrivers(): Observable<any> {
    const token = localStorage.getItem('token') || '';
    return this.http.get<any>(`${this.apiUrl}/drivers`, {
      headers: { Authorization: `Bearer ${token}` }
    });
  }

   // Delete driver
   deleteDriver(driverId: string): Observable<any> {
    const token = localStorage.getItem('token') || '';
    return this.http.delete(`${this.apiUrl}/${driverId}`, {
      headers: { Authorization: `Bearer ${token}` }
    });
  }

  assignDriver(bookingId: string, driverId: string) {
    const token = localStorage.getItem('token');
    return this.http.put(`${this.driverUrl}/assign-driver/${bookingId}`, { driverId } , { 
      headers : { Authorization: `Bearer ${token}`}
    });
  }
  
  // GET assigned bookings for logged-in driver
  getAssignedBookingsForDriver(): Observable<any> {
    const token = localStorage.getItem('token');
    return this.http.get(`${this.apiUrl}/assignedbooking`, { 
      headers : { Authorization: `Bearer ${token}`}
    });
  }

  getDriverProfile(): Observable<any> {
    const token = localStorage.getItem('token');
    return this.http.get(`${this.apiUrl}/profile`, {
      headers : { Authorization: `Bearer ${token}`}
    });
  }

  updateAvailabilityStatus(data: { availabilityStatus: string }) {
    const token = localStorage.getItem('token');
    return this.http.put<{ message: string, status: string }>(
      `${this.apiUrl}/update-status`, 
      data , {headers: { Authorization: `Bearer ${token}`}}
    );
  }

  updateTripStatus(tripId: string, status: string) {
      const token = localStorage.getItem('token');
      const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
  
      return this.http.put(`${this.apiUrl}/update-trip-status/${tripId}`, { tripStatus: status }, { headers });
    }
  
}
