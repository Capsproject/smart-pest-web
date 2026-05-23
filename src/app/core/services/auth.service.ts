import { inject, Injectable, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { tap } from 'rxjs/operators';
import { environment } from '../../../environments/environment';

export interface LoginRequest {
  email: string;
  password: string;
}

export interface LoginResponse {
  access_token: string;
  refresh_token: string;
  token_type: string;
}

@Injectable({ providedIn: 'root' })
export class AuthService {
  private http = inject(HttpClient);
  private router = inject(Router);

  private readonly ACCESS_TOKEN_KEY = 'access_token';
  private readonly REFRESH_TOKEN_KEY = 'refresh_token';

  isAuthenticated = signal(!!this.getAccessToken());

  login(credentials: LoginRequest) {
    return this.http
      .post<LoginResponse>(`${environment.apiUrl}/api/v1/auth/login`, credentials)
      .pipe(
        tap(res => {
          localStorage.setItem(this.ACCESS_TOKEN_KEY, res.access_token);
          localStorage.setItem(this.REFRESH_TOKEN_KEY, res.refresh_token);
          this.isAuthenticated.set(true);
        }),
      );
  }

  logout() {
    const token = this.getAccessToken();
    if (token) {
      this.http
        .post(`${environment.apiUrl}/api/v1/auth/logout`, {})
        .subscribe({ error: () => {} });
    }
    localStorage.removeItem(this.ACCESS_TOKEN_KEY);
    localStorage.removeItem(this.REFRESH_TOKEN_KEY);
    this.isAuthenticated.set(false);
    this.router.navigate(['/login']);
  }

  getAccessToken(): string | null {
    return localStorage.getItem(this.ACCESS_TOKEN_KEY);
  }
}
