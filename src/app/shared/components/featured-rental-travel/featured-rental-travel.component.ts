import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-featured-rental-travel',
  imports: [],
  templateUrl: './featured-rental-travel.component.html',
  styleUrl: './featured-rental-travel.component.css'
})
export class FeaturedRentalTravelComponent {

  @Input() rental:any;
}
