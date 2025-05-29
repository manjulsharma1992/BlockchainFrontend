import { Component, OnInit } from '@angular/core';
import { Router, RouterLink, RouterOutlet } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [RouterLink,CommonModule],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})
export class NavbarComponent implements OnInit {
  userId: string | null = null;
  loginTime: string | null = null;

  constructor(private authService: AuthService, private router: Router) {}

  // ngOnInit(): void {
  //   this.userId = this.authService.getCurrentUser();
  //   const storedTime = this.authService.getLoginTime();
  //   if (storedTime) {
  //     this.loginTime = this.formatDate(new Date(storedTime));
  //   }
  //   this.loginTime = this.authService.getLoginTime();
  // }

  ngOnInit(): void {
    this.userId = this.authService.getCurrentUser();
    const storedTime = this.authService.getLoginTime();
    this.loginTime = storedTime ?? 'Unknown'; // Use as-is
  }
// ✅ Format date as d/M/yy, h:mm AM/PM
// formatDate(date: Date): string {
//   return new Intl.DateTimeFormat('en-GB', { // ✅ 'en-GB' for DD/MM/YY format
//     day: 'numeric', month: 'numeric', year: '2-digit',
//     hour: 'numeric', minute: 'numeric', hour12: true
//   }).format(date);
// }

  logout(): void {
    this.authService.logout();
    this.router.navigate(['/login']); // Redirect to login after logout
  }
}
