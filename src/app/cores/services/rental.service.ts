import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class RentalService {

  private baseUrl = `${environment.API_URL}/rental`;
  

  constructor(private http: HttpClient) {}

  addRental(formData: FormData): Observable<any> {
    const headers = new HttpHeaders({
      Authorization: `Bearer ${localStorage.getItem('token')}`
    });
    return this.http.post(`${this.baseUrl}/rentalAdd`, formData, { headers });
  }

  getAllRentals(): Observable<any> {
    const token = localStorage.getItem('token'); // Get Token from Storage
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    return this.http.get<any>(`${this.baseUrl}/rentals`, { headers });
  } 

  getAllRentalsForCustomers(): Observable<any> {
    return this.http.get(`${this.baseUrl}/getAllRentals`);
  }
  
  deleteRental(id: string): Observable<any> {
    const token = localStorage.getItem('token'); // Get token from localStorage
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}` // Attach token to request
    });

    return this.http.delete(`${this.baseUrl}/rental/${id}`, { headers });
  }

  // ✅ Get Rental by ID
  getRentalById(rentalId: string): Observable<any> {
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });

    return this.http.get(`${this.baseUrl}/rental/${rentalId}`, { headers });
  }

   // Update rental API
   updateRental(rentalId: string, rentalData: any): Observable<any> {
    const token = localStorage.getItem('token'); // Get token from localStorage
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}` // Attach token to request
    });

    return this.http.put(`${this.baseUrl}/rental/${rentalId}`, rentalData, { headers });
  }

}
