import { refrees } from './../core/models/mocks.models';
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
        title: 'Árbitros',
      },
      {
        path: 'new',
        loadComponent: () =>
          import('./refree-form/refree-form.component').then(
            c => c.RefreeFormComponent
          ),
        title: 'Novo Árbitro',
      },
      {
        path: 'edit/:id',
        loadComponent: () =>
          import('./refree-form/refree-form.component').then(
            c => c.RefreeFormComponent
          ),
        title: 'Editar Árbitro',
      },
    ],
  },
];
