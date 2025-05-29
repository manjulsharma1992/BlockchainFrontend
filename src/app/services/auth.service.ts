import { Inject, Injectable, PLATFORM_ID } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, tap } from 'rxjs';
import { environment } from '../../enviornments/environment';
import { isPlatformBrowser } from '@angular/common';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl = `${environment.apiUrl}`;

  constructor(
    private http: HttpClient,
    @Inject(PLATFORM_ID) private platformId: object // ✅ Detect SSR (Angular Universal)
  ) {}

  // 🔹 Login & Store Token with Time
  login(credentials: { email: string; password: string }): Observable<{ token: string }> {
    const loginData = { username: credentials.email, password: credentials.password };

    return this.http.post<{ token: string }>(`${this.apiUrl}/login`, loginData).pipe(
      tap((response) => {
        if (response.token) {
          console.log('✅ Storing token for:', credentials.email);
          this.storeLoginDetails(credentials.email, response.token);
        }
      })
    );
  }

  // 🔹 Store token & login time in sessionStorage (Browser Only)
  // private storeLoginDetails(email: string, token: string) {
  //   if (isPlatformBrowser(this.platformId)) { // ✅ Prevents SSR errors
  //     const loginTime = new Date().toISOString(); // Store timestamp
  //     sessionStorage.setItem(`authToken_${email}`, token);
  //     sessionStorage.setItem('currentUser', email);
  //     sessionStorage.setItem('loginTime', loginTime);
  //   }
  //}

  private storeLoginDetails(email: string, token: string) {
    if (isPlatformBrowser(this.platformId)) {
      const now = new Date();
      let formattedLoginTime = now.toLocaleString('en-GB', {
        day: '2-digit',
        month: '2-digit',
        year: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
        hour12: true,
      });
      formattedLoginTime = formattedLoginTime.replace(/am|pm/, match => match.toUpperCase());
      sessionStorage.setItem(`authToken_${email}`, token);
      sessionStorage.setItem('currentUser', email);
      sessionStorage.setItem('loginTime', formattedLoginTime);
    }
  }
  

  // 🔹 Get Token (Browser Only)
  getToken(): string | null {
    if (isPlatformBrowser(this.platformId)) {
      const currentUser = sessionStorage.getItem('currentUser');
      return currentUser ? sessionStorage.getItem(`authToken_${currentUser}`) : null;
    }
    return null;
  }

  

  // 🔹 Get Login Time
  getLoginTime(): string | null {
    if (isPlatformBrowser(this.platformId)) {
      return sessionStorage.getItem('loginTime');
    }
    return null;
  }
  

  // 🔹 Get Logged-in User ID
  getCurrentUser(): string | null {
    if (isPlatformBrowser(this.platformId)) {
      return sessionStorage.getItem('currentUser');
    }
    return null;
  }

  // 🔹 Logout & Clear Session Data
  logout(): void {
    if (isPlatformBrowser(this.platformId)) {
      const currentUser = sessionStorage.getItem('currentUser');
      if (currentUser) {
        console.log('🚪 Logging out:', currentUser);
        sessionStorage.removeItem(`authToken_${currentUser}`);
        sessionStorage.removeItem('currentUser');
        sessionStorage.removeItem('loginTime');
      }
    }
  }

  // 🔹 Check if User is Authenticated
  isAuthenticated(): boolean {
    if (isPlatformBrowser(this.platformId)) {
      return !!this.getToken();
    }
    return false;
  }

  // 🔹 User Signup
  signup(userData: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/signup`, {
      FullName: userData.fullName,
      Email: userData.email,
      Password: userData.password
    });
  }
}
