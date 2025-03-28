import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';

@Component({
  selector: 'app-testimonials',
  imports: [CommonModule],
  templateUrl: './testimonials.component.html',
  styleUrl: './testimonials.component.css'
})
export class TestimonialsComponent {

  reviews = [
    { name: 'Amit', comment: 'Great car rental experience!', rating: 5 },
    { name: 'Priya', comment: 'Affordable and smooth process.', rating: 4 },
    { name: 'Rahul', comment: 'Loved the customer support!', rating: 4.5 },
    { name: 'Amit', comment: 'Great car rental experience!', rating: 5 },
    { name: 'Priya', comment: 'Affordable and smooth process.', rating: 4 },
    { name: 'Rahul', comment: 'Loved the customer support!', rating: 4.5 }
  ];

  getStars(rating: number): string[] {
    const stars = Math.round(rating);
    return Array(stars).fill('★');
  }
}
