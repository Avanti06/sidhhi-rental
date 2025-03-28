import { Component, OnInit } from '@angular/core';
import { DriverService } from '../../../../cores/services/driver.service';
import { CommonModule } from '@angular/common';
import * as bootstrap from 'bootstrap';

@Component({
  selector: 'app-view-drivers',
  imports: [CommonModule],
  templateUrl: './view-drivers.component.html',
  styleUrl: './view-drivers.component.css'
})
export class ViewDriversComponent implements OnInit {

  drivers: any[] = [];
  isLoading = false;
  currentPage = 1;
  itemsPerPage = 5;
  totalPages = 0;
  selectedDriverId: string = '';
  selectedDriverName: string = '';
  deletedDriverName: string = '';

  constructor(private driverService: DriverService) {}

  ngOnInit(): void {
    this.fetchDrivers();
  }

  // ✅ Fetch All Drivers from Backend API
  fetchDrivers() {
    this.isLoading = true;
    this.driverService.getAllDrivers().subscribe(
      (response: any) => {
        if (!response || !Array.isArray(response)) {
          console.error('Invalid API response:', response);
          this.drivers = [];
          this.totalPages = 0;
          return;
        }

        // ✅ Ensure Only Drivers Are Displayed
        this.drivers = response.filter((driver: any) => driver.role === 'driver');

        // ✅ Pagination Calculation
        this.totalPages = Math.ceil(this.drivers.length / this.itemsPerPage);
        this.updatePagination();
      },
      (error) => {
        console.error('Error fetching drivers:', error);
        this.drivers = [];
      }
    ).add(() => this.isLoading = false);
  }

  openDeleteModal(driverId: string, driverName: string) {
    this.selectedDriverId = driverId;
    this.selectedDriverName = driverName;
  
    // ✅ Ensure the modal opens manually using Bootstrap's API
    let modalElement = document.getElementById('deleteModal');
    if (modalElement) {
      let modalInstance = new bootstrap.Modal(modalElement);
      modalInstance.show();
    }
  }

  // ✅ Update Pagination
  updatePagination() {
    const startIndex = (this.currentPage - 1) * this.itemsPerPage;
    const endIndex = startIndex + this.itemsPerPage;
    return this.drivers.slice(startIndex, endIndex);
  }

  // ✅ Go to Next Page
  nextPage() {
    if (this.currentPage < this.totalPages) {
      this.currentPage++;
    }
  }

  // ✅ Go to Previous Page
  prevPage() {
    if (this.currentPage > 1) {
      this.currentPage--;
    }
  }

  //  // Show confirmation popup before deleting
  //  confirmDelete(driverId: string, driverName: string) {
  //   if (confirm(`Are you sure you want to delete ${driverName}?`)) {
  //     this.deleteDriver(driverId);
  //   }
  // }

  // Delete driver from backend
  deleteDriver() {
    this.driverService.deleteDriver(this.selectedDriverId).subscribe(
      () => {
        this.drivers = this.drivers.filter(driver => driver._id !== this.selectedDriverId);
        this.deletedDriverName = this.selectedDriverName;
        let successModal = new bootstrap.Modal(document.getElementById('successModal')!);
        successModal.show();
        
      },
      (error) => {
        console.error('Error deleting driver', error);
        let errorModal = new bootstrap.Modal(document.getElementById('errorModal')!);
        errorModal.show();
      }
    );
  }
}
