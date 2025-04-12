import { Component } from '@angular/core';
import { Router, RouterOutlet } from '@angular/router';

import { FooterComponent } from './shared/components/footer/footer.component';
import { HomeComponent } from './shared/components/home/home.component';
import { NavbarComponent } from './shared/components/navbar/navbar.component';
import { CommonModule } from '@angular/common';
import { AuthService } from './cores/auth.service';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet,NavbarComponent,FooterComponent,CommonModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'sidhi-booking-app';
  showFooter: boolean = true;

  constructor(private router: Router, private authService: AuthService){
    this.router.events.subscribe(() => {

      const hiddenRoutes = [
        '/login',
        '/register',
        '/admin-dashboard',
        '/driver-dashboard',
        '/dashbord/user'
      ];

      this.showFooter = !hiddenRoutes.some(route => this.router.url.startsWith(route));
    })

  }

  get hideNavbar(): boolean {
    const role = this.authService.getUserRole();
    return role === 'driver';
  }

}
