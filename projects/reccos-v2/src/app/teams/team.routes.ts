import { Routes } from '@angular/router';
import { TeamsListComponent } from './teams-list/teams-list.component';
import { TeamFormPageComponent } from './team-form-page/team-form-page.component';

export const TEAM_ROUTES: Routes = [
  {
    path: '',
    component: TeamsListComponent,
    title: 'Times',
  },
  {
    path: 'new',
    component: TeamFormPageComponent,
    title: 'Novo Time',
  },
  {
    path: ':id/edit',
    component: TeamFormPageComponent,
    title: 'Editar Time',
  },
  // Outras rotas relacionadas a times podem ser adicionadas aqui
];
