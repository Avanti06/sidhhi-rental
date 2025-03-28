import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';

@Component({
  selector: 'app-our-service',
  imports: [CommonModule],
  templateUrl: './our-service.component.html',
  styleUrl: './our-service.component.css'
})
export class OurServiceComponent {

  services = [
    { image: 'assets/images/creta.jpeg', title: 'Car Rental', description: 'Flexible rental options with top-rated vehicles.' },
    { image: 'assets/images/travel5.jpeg', title: 'Travel Services', description: 'Professional drivers & comfortable rides.' },
    { image: 'assets/images/travels3.jpeg', title: 'Van Rental', description: 'Spacious vans for group travel & logistics.' }
  ];

  steps = [
    { title: 'Step 1', description: 'Choose your vehicle & location.' },
    { title: 'Step 2', description: 'Select rental duration & additional services.' },
    { title: 'Step 3', description: 'Confirm your booking & enjoy the ride.' }
  ];
}
