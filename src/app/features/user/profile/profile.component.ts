import { AfterViewInit, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { AuthService } from '../../../cores/auth.service';
import { Router, RouterLink } from '@angular/router';
declare var bootstrap: any;

@Component({
  selector: 'app-profile',
  imports: [RouterLink],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.css'
})
export class ProfileComponent implements OnInit, AfterViewInit{
   user: any;
   @ViewChild('profileDropdown', { static: false}) profileDropdown!: ElementRef;

  constructor(private authService: AuthService, private router: Router) {}

  ngAfterViewInit(): void {
    const dropdownButton = this.profileDropdown.nativeElement;
    new bootstrap.Dropdown(dropdownButton);
  }

  ngOnInit() {
   this.getUserDetails();
  }

  getUserDetails() {
    this.user = this.authService.currentUserValue;
  }

 
}

