import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class InvoiceService {

  private baseUrl = `${environment.API_URL}/invoice`;
  
  constructor(private http: HttpClient) { }

  downloadInvoice(bookingId: string) {
    return this.http.get(`${this.baseUrl}/${bookingId}`, {
      responseType: 'json',
    });
  }
}
