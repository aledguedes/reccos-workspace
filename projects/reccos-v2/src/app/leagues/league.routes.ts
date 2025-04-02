import { Routes } from '@angular/router';
import { LeaguesComponent } from './leagues.component';
import { LeaguesListComponent } from './leagues-list/leagues-list.component';
import { LeagueFormComponent } from './league-form/league-form.component';

export const LEAGUE_ROUTES: Routes = [
  {
    path: '',
    component: LeaguesComponent,
    children: [
      {
        path: '',
        component: LeaguesListComponent,
      },
      {
        path: 'new',
        component: LeagueFormComponent,
      },
      {
        path: ':id/edit',
        component: LeagueFormComponent,
      },
    ],
  },
];
