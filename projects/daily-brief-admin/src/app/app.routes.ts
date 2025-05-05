import { Routes } from '@angular/router';

export const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: 'login' },
  {
    path: 'login',
    loadComponent: () =>
      import('./login/login.component').then(c => c.LoginComponent),
  },
  {
    path: 'dashboard',
    loadComponent: () =>
      import('./dashboard/dashboard.component').then(c => c.DashboardComponent),
  },
  {
    path: 'posts',
    loadComponent: () =>
      import('./posts/posts.component').then(c => c.PostsComponent),
  },
  {
    path: 'users',
    loadComponent: () =>
      import('./users/users.component').then(c => c.UsersComponent),
  },
  {
    path: 'logs',
    loadComponent: () =>
      import('./logs/logs.component').then(c => c.LogsComponent),
  },
];
