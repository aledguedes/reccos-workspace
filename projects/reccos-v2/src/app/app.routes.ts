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
        path: 'players',
        loadChildren: () =>
          import('./players/player.routes').then(r => r.PLAYER_ROUTES),
      },
      {
        path: 'federations',
        loadChildren: () =>
          import('./federations/federation.routes').then(
            r => r.FEDERATION_ROUTES
          ),
      },
      {
        path: 'refrees',
        loadChildren: () =>
          import('./refrees/refree.routes').then(r => r.REFREE_ROUTES),
      },
      // Future routes will be added here
    ],
  },
];
