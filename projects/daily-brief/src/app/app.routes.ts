import { Routes } from '@angular/router';

export const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: 'home' },
  {
    path: 'home',
    loadComponent: () =>
      import('./pages/home.component').then(c => c.HomeComponent),
  },
  {
    path: 'post/:id',
    loadComponent: () =>
      import('./pages/post-detail.component').then(c => c.PostDetailComponent),
  },
  {
    path: 'category/:category',
    loadComponent: () =>
      import('./pages/category.component').then(c => c.CategoryComponent),
  },
  {
    path: 'about',
    loadComponent: () =>
      import('./pages/about.component').then(c => c.AboutComponent),
  },
  {
    path: 'contact',
    loadComponent: () =>
      import('./pages/contact.component').then(c => c.ContactComponent),
  },
];
