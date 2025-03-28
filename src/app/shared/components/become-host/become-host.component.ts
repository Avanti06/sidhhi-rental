import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-become-host',
  imports: [RouterLink],
  templateUrl: './become-host.component.html',
  styleUrl: './become-host.component.css'
})
export class BecomeHostComponent {
 router: any;

 registerHost() {
  this.router.navigate(['/provider-register']);
 }
}
