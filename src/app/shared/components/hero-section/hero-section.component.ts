import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { SearchBarComponent } from '../search-bar/search-bar.component';
;


@Component({
  selector: 'app-hero-section',
  imports: [CommonModule,SearchBarComponent],
  templateUrl: './hero-section.component.html',
  styleUrl: './hero-section.component.css'
})
export class HeroSectionComponent {

 
}
