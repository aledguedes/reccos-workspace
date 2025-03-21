import { Routes } from '@angular/router';
import { LeaguesComponent } from './leagues.component';

export const LEAGUE_ROUTES: Routes = [
  {
    path: '',
    component: LeaguesComponent,
    children: [
      {
        path: '',
        component: LeaguesComponent,
      },
    ],
  },
];
