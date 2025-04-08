import { Routes } from '@angular/router';
import { PlayerssComponent } from './players.components';
import { ListDefaultComponent } from '../shared/components/list-default/list-default.component';

export const PLAYER_ROUTES: Routes = [
  {
    path: '',
    component: PlayerssComponent,
    children: [
      {
        path: '',
        component: ListDefaultComponent,
        title: 'Usuários',
      },
    ],
  },
];
