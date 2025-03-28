import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class DriverService {
 
  private apiUrl = `${environment.API_URL}/driver`;
  
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
  
}
