import { Component } from '@angular/core';
import { EarningsService } from '../../../../cores/services/earnings.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-earnings',
  imports: [CommonModule, FormsModule],
  templateUrl: './earnings.component.html',
  styleUrl: './earnings.component.css'
})
export class EarningsComponent {

  filter: string = 'monthly';
  totalBookingAmount: number = 0;
  totalRemainingAmount: number = 0;
  totalEarnings: number = 0;
  totalBookings: number = 0;
  bookings: any[] = [];

  filters: string[] = ['daily', 'weekly', 'monthly', 'yearly'];

  constructor(private earningsService: EarningsService) {}

  ngOnInit(): void {
    this.fetchReport();
  }

  fetchReport() {
    this.earningsService.getEarningsReport(this.filter).subscribe((res: any) => {
      this.totalBookings = res.totalBookings;
      this.bookings = res.bookings;

      this.totalBookingAmount = this.bookings.reduce((sum, b) => sum + (b.bookingAmount || 0), 0);
    this.totalRemainingAmount = this.bookings.reduce((sum, b) => sum + (b.remainingAmount || 0), 0);
    this.totalEarnings = this.bookings.reduce((sum, b) => sum + (b.totalAmount || 0), 0);
    }, err => {
      console.error('Error fetching report', err);
    });
  }

  downloadReport() {
    this.earningsService.downloadReport(this.filter).subscribe((res: Blob) => {
      const blob = new Blob([res], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });
      const url = window.URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.download = `Earnings-Report-${this.filter}.xlsx`;
      link.click();
    }, err => {
      console.error('Download failed', err);
    });
  }

  downloadPdf() {
    this.earningsService.downloadPdfReport(this.filter).subscribe((res: Blob) => {
      const blob = new Blob([res], { type: 'application/pdf' });
      const url = window.URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.download = `Earnings-Report-${this.filter}.pdf`;
      link.click();
    }, err => {
      console.error('PDF Download failed', err);
    });
  }
  
}
