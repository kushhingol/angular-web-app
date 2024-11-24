import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private apiUrl = 'http://localhost:3000/api'; // Replace with your API URL

  constructor(private http: HttpClient) {}

  register(data: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/users/register`, data);
  }

  login(email: string, password: string): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/auth/login`, {
      email,
      password,
    });
  }

  // Check if user is authenticated (for demo, just returning true)
  isAuthenticated(): boolean {
    return localStorage.getItem('authToken') !== null;
  }

  isUserAdmin(): boolean {
    return localStorage.getItem('role') === 'admin';
  }
}
