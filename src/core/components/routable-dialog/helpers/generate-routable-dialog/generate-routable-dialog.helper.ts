import { Type } from '@angular/core';
import { Route } from '@angular/router';
import { TuiDialogOptions } from '@taiga-ui/core';

type RouteDataOptions<T> = Omit<Partial<TuiDialogOptions<T>> & { path?: string; isNavigateToParent?: boolean }, 'label'>;

export const generateDialogableRoute = <T>(component: Type<unknown>, { path = '', ...dialogOptions }: RouteDataOptions<T> = {}): Route => {
  return {
    path,
    loadComponent: () => import('../../routable-dialog.component').then((m) => m.RoutableDialogComponent),
    data: {
      dialog: component,
      isLazy: true,
      dialogOptions,
    },
  };
};
