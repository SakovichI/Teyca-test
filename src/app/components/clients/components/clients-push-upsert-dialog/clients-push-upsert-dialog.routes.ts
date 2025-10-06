import { tuiGenerateDialogableRoute } from '@taiga-ui/kit';
import { ClientsPushUpsertDialogComponent } from './clients-push-upsert-dialog.component';
import { Routes } from '@angular/router';

export const routes: Routes = [
  tuiGenerateDialogableRoute(ClientsPushUpsertDialogComponent, {
    size: 'l',
    closeable: true,
    dismissible: false,
  }),
];
