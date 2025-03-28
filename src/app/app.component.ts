import { Component } from '@angular/core';
import { Router, RouterOutlet } from '@angular/router';

import { FooterComponent } from './shared/components/footer/footer.component';
import { HomeComponent } from './shared/components/home/home.component';
import { NavbarComponent } from './shared/components/navbar/navbar.component';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet,NavbarComponent,FooterComponent,CommonModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'sidhi-booking-app';
  showFooter: boolean = true;

  constructor(private router: Router){
    this.router.events.subscribe(() => {

      const hiddenRoutes = [
        '/login',
        '/register',
        '/admin-dashboard',
        '/dashbord/user'
      ];

      this.showFooter = !hiddenRoutes.some(route => this.router.url.startsWith(route));
    })

  }
}
