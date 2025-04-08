import { Routes } from '@angular/router';
import { FederationsComponent } from './federations.component';
import { ListDefaultComponent } from '../shared/components/list-default/list-default.component';

export const FEDERATION_ROUTES: Routes = [
  {
    path: '',
    component: FederationsComponent,
    children: [
      {
        path: '',
        component: ListDefaultComponent,
        title: 'Usuários',
      },
    ],
  },
];
