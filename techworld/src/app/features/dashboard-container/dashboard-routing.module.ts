import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardContainerComponent } from './dashboard-container.component';

export const routes: Routes = [
  {
    path: '',
    component: DashboardContainerComponent,
    children: [
      {
        path: 'users',
        loadChildren: () =>
          import('../users/users.module').then((m) => m.UsersModule),
      },
      {
        path: 'user-profile',
        loadChildren: () =>
          import('../user-profile/user-profile.module').then(
            (m) => m.UserProfileModule
          ),
      },
      {
        path: 'todos',
        loadChildren: () =>
          import('../todos/todos.module').then((m) => m.TodosModule),
      },
      {
        path: 'posts',
        loadChildren: () =>
          import('../posts/posts.module').then((m) => m.PostsModule),
      },
      {
        path: 'albums',
        loadChildren: () =>
          import('../albums/albums.module').then((m) => m.AlbumsModule),
      },
      {
        path: 'comments',
        loadChildren: () =>
          import('../comments/comments.module').then((m) => m.CommentsModule),
      },
      {
        path: '',
        loadChildren: () =>
          import('../dashboard/dashboard.module').then(
            (m) => m.DashboardModule
          ),
      },
    ],
  },
  { path: '', redirectTo: '/dashboard', pathMatch: 'full' },
  { path: '**', redirectTo: '/dashboard' },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DashboardContainerRoutingModule {}
