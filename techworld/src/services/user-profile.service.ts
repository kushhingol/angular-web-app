import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class UserProfileService {
  private baseUrl = 'http://localhost:3000/api/users';

  constructor(private http: HttpClient) {}

  getUserById(userId: string): Observable<any> {
    return this.http.get<any>(`${this.baseUrl}/${userId}`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('authToken')}`,
      },
    });
  }

  updateUserById(userId: string, userData: any): Observable<any> {
    return this.http.put<any>(`${this.baseUrl}/${userId}`, userData, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('authToken')}`,
      },
    });
  }
}
