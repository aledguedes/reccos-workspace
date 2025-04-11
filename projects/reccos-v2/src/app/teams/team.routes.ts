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
          import('./team-form-steps/team-form-steps.component').then(
            c => c.TeamFormStepsComponent
          ),
        title: 'Novo Time',
      },
      {
        path: 'edit/:id',
        loadComponent: () =>
          import('./team-form-steps/team-form-steps.component').then(
            c => c.TeamFormStepsComponent
          ),
        title: 'Editar Time',
      },
    ],
  },
  // Outras rotas relacionadas a times podem ser adicionadas aqui
];
