import { Routes } from '@angular/router';
import { authGuard } from '../auth/guards';

export const routes: Routes = [
  {
    path: 'login',
    loadComponent: () => import('./components/login/login.component').then((m) => m.LoginComponent),
  },
  {
    path: 'clients',
    loadChildren: () => import('./components/clients').then((m) => m.routes),
    canActivate: [authGuard],
  },
  {
    path: '',
    redirectTo: '/login',
    pathMatch: 'full',
  },
  {
    path: '**',
    redirectTo: '/clients',
  },
];
