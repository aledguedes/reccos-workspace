import { Routes } from '@angular/router';
import { UsersComponent } from './users.components';
import { ListDefaultComponent } from '../shared/components/list-default/list-default.component';
import { UserFormComponent } from '../auth/registration/user-form/user-form.component';
import { UserInviteComponent } from './user-invite/user-invite.component';

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
      {
        path: 'new',
        component: UserInviteComponent,
        title: 'Novo Usuário',
      },
    ],
  },
];
