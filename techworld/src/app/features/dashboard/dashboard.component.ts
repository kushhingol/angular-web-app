import { Component, OnInit } from '@angular/core';
import { DashboardService } from '../../../services/dashboard.service';
import { AuthService } from '../../../services/auth.service';
import { ThemeService } from '../../../services/theme.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
})
export class DashboardComponent implements OnInit {
  dashboardCards: any[] = [];
  postsCount = 0;
  commentsCount = 0;
  albumsCount = 0;
  todosCount = 0;
  usersCount = 0;
  isAdmin = false;

  constructor(
    private dashboardService: DashboardService,
    private authService: AuthService,
    private themeService: ThemeService
  ) {}

  ngOnInit(): void {
    const theme = this.themeService.getTheme();
    document.body.setAttribute('data-theme', theme);

    // Fetch data for posts, comments, albums, todos, and users
    this.dashboardService.getPosts().subscribe((posts) => {
      this.dashboardCards.push({
        title: 'Posts',
        count: posts.length,
        link: '/dashboard/posts',
      });
      this.postsCount = posts.length;
    });
    this.dashboardService.getComments().subscribe((comments) => {
      this.dashboardCards.push({
        title: 'Comments',
        count: comments.length,
        link: '/dashboard/comments',
      });
      this.commentsCount = comments.length;
    });
    this.dashboardService.getAlbums().subscribe((albums) => {
      this.dashboardCards.push({
        title: 'Albums',
        count: albums.length,
        link: '/dashboard/albums',
      });
      this.albumsCount = albums.length;
    });
    this.dashboardService.getTodos().subscribe((todos) => {
      this.dashboardCards.push({
        title: 'Todos',
        count: todos.length,
        link: '/dashboard/todos',
      });
      this.todosCount = todos.length;
    });
    this.dashboardService.getUsers().subscribe((users) => {
      this.usersCount = users.length;
      this.dashboardCards.push({
        title: 'Users',
        count: users.length,
        link: '/dashboard/users',
      });
      // Check if the user has admin role
      this.isAdmin = this.authService.isUserAdmin();
    });
  }
}
