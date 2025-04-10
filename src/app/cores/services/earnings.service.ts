import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class EarningsService {

  private baseUrl = `${environment.API_URL}/booking`;

  constructor(private http: HttpClient) { }

  private getAuthHeaders() {
    const token = localStorage.getItem('token');
    return new HttpHeaders().set('Authorization', `Bearer ${token}`);
  }
  
  // earnings.service.ts
getEarningsReport(filter: string) {
  const params = new HttpParams().set('filter', filter);
  return this.http.get(`${this.baseUrl}/earnings-report`, { 
    params,
    headers : this.getAuthHeaders() });
}

downloadReport(filter: string) {
  const params = new HttpParams().set('filter', filter);
  return this.http.get(`${this.baseUrl}/earnings-report/download`, {
    params,
    headers: this.getAuthHeaders(),
    responseType: 'blob' // Important for file download
  });
}

downloadPdfReport(filter: string) {
  const params = new HttpParams().set('filter', filter);
  return this.http.get(`${this.baseUrl}/earnings-report/pdf-download`, {
    params,
    headers: this.getAuthHeaders(),
    responseType: 'blob' // Important for file download
  });
}

}
