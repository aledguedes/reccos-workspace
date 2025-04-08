import { Routes } from '@angular/router';
import { LeaguesComponent } from './leagues.component';
import { LeagueFormComponent } from './league-form/league-form.component';
import { ListDefaultComponent } from '../shared/components/list-default/list-default.component';

export const LEAGUE_ROUTES: Routes = [
  {
    path: '',
    component: LeaguesComponent,
    children: [
      {
        path: '',
        component: ListDefaultComponent,
        title: 'Ligas',
      },
      {
        path: 'new',
        component: LeagueFormComponent,
        title: 'Nova Liga',
      },
      {
        path: ':id/edit',
        component: LeagueFormComponent,
        title: 'Editar Liga',
      },
    ],
  },
];
