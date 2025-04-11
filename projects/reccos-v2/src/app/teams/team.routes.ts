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
        title: 'Lista de Times',
      },
      {
        path: 'new',
        loadComponent: () =>
          import('./team-form/team-form.component').then(
            c => c.TeamFormComponent
          ),
        title: 'Novo Time',
      },
      {
        path: 'edit/:id',
        loadComponent: () =>
          import('./team-form/team-form.component').then(
            c => c.TeamFormComponent
          ),
        title: 'Editar Time',
      },
    ],
  },
  // Outras rotas relacionadas a times podem ser adicionadas aqui
];
