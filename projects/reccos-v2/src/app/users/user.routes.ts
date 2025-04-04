import { Routes } from '@angular/router';
import { TeamsComponent } from '../teams/teams.component';
import { UsersListComponent } from './users-list/users-list.component';

export const USER_ROUTES: Routes = [
  {
    path: '',
    component: TeamsComponent,
    children: [
      {
        path: '',
        component: UsersListComponent,
        title: 'Usuários',
      },
    ],
  },
];
