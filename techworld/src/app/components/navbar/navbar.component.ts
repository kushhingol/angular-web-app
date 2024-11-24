import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../../services/auth.service';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss'],
})
export class NavBarComponent {
  constructor(private authService: AuthService, private router: Router) {}

  onLogout(): void {
    localStorage.clear();
    this.router.navigate(['/login']);
  }

  onSettings(): void {
    this.router.navigate(['/dashboard/user-profile']);
  }
}
