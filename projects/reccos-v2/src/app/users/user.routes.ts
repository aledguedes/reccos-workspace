import { Routes } from '@angular/router';
import { TeamsComponent } from '../teams/teams.component';
import { UsersListComponent } from './users-list/users-list.component';
import { UsersComponent } from './users.components';
import { ListDefaultComponent } from '../shared/components/list-default/list-default.component';

export const USER_ROUTES: Routes = [
  {
    path: '',
    component: UsersComponent,
    children: [
      {
        path: '',
        component: ListDefaultComponent,
        title: 'Usuários',
      },
    ],
  },
];
