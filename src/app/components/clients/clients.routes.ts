import { Routes } from '@angular/router';
export const routes: Routes = [
  {
    path: '',
    loadComponent: () => import('./clients.component').then((m) => m.ClientsComponent),
    children: [
      {
        path: 'new',
        loadChildren: () => import('./components/clients-upsert-dialog').then((m) => m.routes),
      },
      {
        path: ':id/edit',
        loadChildren: () => import('./components/clients-upsert-dialog').then((m) => m.routes),
      },
    ],
  },

  {
    path: '**',
    pathMatch: 'full',
    redirectTo: '',
  },
];
