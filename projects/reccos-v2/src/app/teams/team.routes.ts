import { Routes } from '@angular/router';
import { TeamsListComponent } from './teams-list/teams-list.component';

export const TEAM_ROUTES: Routes = [
  {
    path: '',
    component: TeamsListComponent,
    title: 'Times',
  },
  // Outras rotas relacionadas a times podem ser adicionadas aqui
  // Por exemplo:
  // {
  //   path: ':id',
  //   component: TeamDetailsComponent,
  //   title: 'Detalhes do Time',
  // },
];
