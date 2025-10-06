import { Routes } from '@angular/router';
import { ClientsUpsertDialogComponent } from './clients-upsert-dialog.component';
import { generateDialogableRoute } from '../../../../../core/components';

export const routes: Routes = [
  generateDialogableRoute(ClientsUpsertDialogComponent, {
    size: 'l',
    closeable: true,
    dismissible: false,
  }),
];
