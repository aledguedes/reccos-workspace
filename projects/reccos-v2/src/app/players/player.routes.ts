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
        title: 'Jogadores',
      },
      {
        path: 'new',
        loadComponent: () =>
          import('./player-form-page/player-form-page.component').then(
            c => c.PlayerFormPageComponent
          ),
        title: 'Novo Jogador',
      },
      {
        path: 'edit/:id',
        loadComponent: () =>
          import('./player-form-page/player-form-page.component').then(
            c => c.PlayerFormPageComponent
          ),
        title: 'Editar Jogador',
      },
    ],
  },
];
