import { Routes } from '@angular/router';
import { RefreesComponent } from './refrees.component';
import { ListDefaultComponent } from '../shared/components/list-default/list-default.component';

export const REFREE_ROUTES: Routes = [
  {
    path: '',
    component: RefreesComponent,
    children: [
      {
        path: '',
        component: ListDefaultComponent,
        title: 'Usuários',
      },
    ],
  },
];
