import { CommonModule } from '@angular/common';
import { provideHttpClient } from '@angular/common/http';
import { Component ,OnInit } from '@angular/core';
import { NavigationEnd, Router, RouterLink, RouterLinkActive, RouterModule, RouterOutlet } from '@angular/router';
import { NavbarComponent } from './navbar/navbar.component';
import { filter } from 'rxjs';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, CommonModule,RouterModule,NavbarComponent], // Include CommonModule for pipes
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent implements OnInit {
  title = 'Multichain';
  isLoginPage = false;

  isSignupPage(): boolean {
    return this.router.url === '/signup'; // Adjust if your route is different
  }
  hideNavbar(): boolean {
    // Check if the current route is login or signup
    return this.router.url === '/login' || this.router.url === '/signup';
  }

  constructor(private router: Router) {}

  ngOnInit(): void {
    // Listen to router events and check the route
    this.router.events.pipe(
      filter(event => event instanceof NavigationEnd)
    ).subscribe(event => {
      // Set the flag to true if the route is '/login'
      this.isLoginPage = event.urlAfterRedirects === '/login';
    });
  }
}
