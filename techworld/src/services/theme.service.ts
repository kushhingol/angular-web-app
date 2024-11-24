import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class ThemeService {
  private currentTheme = 'light';

  constructor() {
    // Load theme from localStorage if available
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme) {
      if (savedTheme === 'light' || savedTheme === 'dark') {
        this.setTheme(savedTheme);
      }
    }
  }

  getTheme(): string {
    return this.currentTheme;
  }

  setTheme(theme: 'light' | 'dark'): void {
    this.currentTheme = theme;
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem('theme', theme); // Save preference
  }
}
