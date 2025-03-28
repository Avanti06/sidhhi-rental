import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-featured-rental-card',
  imports: [CommonModule],
  templateUrl: './featured-rental-card.component.html',
  styleUrl: './featured-rental-card.component.css'
})
export class FeaturedRentalCardComponent {
    
  @Input() rental: any;
}
