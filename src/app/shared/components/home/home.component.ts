import { Component } from '@angular/core';
import { HeroSectionComponent } from '../hero-section/hero-section.component';
import { FeaturedRentalCardComponent } from '../featured-rental-card/featured-rental-card.component';
import { CommonModule } from '@angular/common';
import { FeaturedRentalTravelComponent } from '../featured-rental-travel/featured-rental-travel.component';
import { TestimonialsComponent } from '../testimonials/testimonials.component';

@Component({
  selector: 'app-home',
  imports: [HeroSectionComponent,FeaturedRentalTravelComponent, FeaturedRentalCardComponent,CommonModule,TestimonialsComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {

  featuredRentals = [
    {
      name: 'Hyundai Creta',
      location: 'Mumbai',
      price: 1500,
      image: 'assets/images/creta.jpeg'
    },
    {
      name: 'Maruti Swift',
      location: 'Delhi',
      price: 1200,
      image: 'assets/images/swift-dezier.jpeg'
    },
    {
      name: 'Honda City',
      location: 'Bangalore',
      price: 1800,
      image: 'assets/images/honda-city.jpeg'
    },
    {
      name: 'Maruti indigo',
      location: 'pune',
      price: 1500,
      image: 'assets/images/indigo.jpeg'
    },
    {
      name: 'Tata',
      location: 'pune',
      price: 1800,
      image: 'assets/images/tata.jpeg'
    },
    {
      name: 'Hyundai Creta',
      location: 'Mumbai',
      price: 1500,
      image: 'assets/images/creta.jpeg'
    },
    {
      name: 'Maruti Swift',
      location: 'Delhi',
      price: 1200,
      image: 'assets/images/swift-dezier.jpeg'
    },
    {
      name: 'Honda City',
      location: 'Bangalore',
      price: 1800,
      image: 'assets/images/honda-city.jpeg'
    }
  ]


  featuredRentalsTravel = [
    {
      name: 'travels DNR',
      location: 'hinganghat',
      price: 10000,
      image: 'assets/images/travels1.jpg'
    },
    {
      name: 'City',
      location: 'hinganghat',
      price: 7000,
      image: 'assets/images/travel2.jpeg'
    },{
      name: 'mini',
      location: 'Pune',
      price: 1800,
      image: 'assets/images/travels3.jpeg'
    },
    {
      name: 'Volvo',
      location: 'Wardha',
      price: 12000,
      image: 'assets/images/travels4.jpeg'
    },
    {
      name: 'DNR',
      location: 'Wardha',
      price: 9000,
      image: 'assets/images/travel5.jpeg'
    },
    {
      name: 'DNR',
      location: 'Wardha',
      price: 9000,
      image: 'assets/images/travel5.jpeg'
    }, {
      name: 'DNR',
      location: 'Wardha',
      price: 9000,
      image: 'assets/images/travel5.jpeg'
    }

  ]

}
