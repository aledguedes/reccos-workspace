import { Routes } from '@angular/router';

import { MainLayoutComponent } from './shared/components/main-layout/main-layout.component';

export const routes: Routes = [
  { path: '', redirectTo: 'auth', pathMatch: 'full' },
  {
    path: 'auth',
    loadChildren: () => import('./auth/auth.routes').then(m => m.AUTH_ROUTES),
  },
  // Main layout wrapper for authenticated routes
  {
    path: '',
    component: MainLayoutComponent,
    children: [
      {
        path: 'leagues',
        loadComponent: () =>
          import('./leagues/leagues.component').then(m => m.LeaguesComponent),
      },
      {
        path: 'federations',
        loadComponent: () =>
          import('./federations/federations.component').then(
            m => m.FederationsComponent
          ),
      },
      // Future routes will be added here
    ],
  },
];
