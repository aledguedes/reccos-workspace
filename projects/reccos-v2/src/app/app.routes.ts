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
        loadChildren: () =>
          import('./leagues/league.routes').then(r => r.LEAGUE_ROUTES),
      },
      {
        path: 'teams',
        loadChildren: () =>
          import('./teams/team.routes').then(r => r.TEAM_ROUTES),
      },
      {
        path: 'users',
        loadChildren: () =>
          import('./users/user.routes').then(r => r.USER_ROUTES),
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
