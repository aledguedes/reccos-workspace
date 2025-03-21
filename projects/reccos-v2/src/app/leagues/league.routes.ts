import { Routes } from '@angular/router';
import { LeaguesComponent } from './leagues.component';
import { LeaguesListComponent } from './leagues-list/leagues-list.component';

export const LEAGUE_ROUTES: Routes = [
  {
    path: '',
    component: LeaguesComponent,
    children: [
      {
        path: '',
        component: LeaguesListComponent,
      },
    ],
  },
];
