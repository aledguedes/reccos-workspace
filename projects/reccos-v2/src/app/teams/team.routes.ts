import { Routes } from '@angular/router';
import { TeamsComponent } from './teams.component';
import { ListDefaultComponent } from '../shared/components/list-default/list-default.component';

export const TEAM_ROUTES: Routes = [
  {
    path: '',
    component: TeamsComponent,
    children: [
      {
        path: '',
        component: ListDefaultComponent,
        title: 'Usuários',
      },
    ],
  },
  // Outras rotas relacionadas a times podem ser adicionadas aqui
];
