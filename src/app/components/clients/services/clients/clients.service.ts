import { inject, Injectable, Injector } from '@angular/core';
import { filter, Observable, take } from 'rxjs';
import { Client, ClientApiService } from '../../../../api';
import { ClientsPushUpsertDialogComponent } from '../../components/clients-push-upsert-dialog/clients-push-upsert-dialog.component';
import { TuiDialogService } from '@taiga-ui/core';
import { PolymorpheusComponent } from '@tinkoff/ng-polymorpheus';

@Injectable()
export class ClientsServices {
  readonly #clientApiService = inject(ClientApiService);
  readonly #dialogs = inject(TuiDialogService);
  readonly #injector = inject(Injector);

  initData(): Observable<Client[]> {
    return this.#clientApiService.getCLients();
  }

  openPushMessageDialog(data: Client[]): void {
    const dialog = this.#dialogs.open<Client>(
      new PolymorpheusComponent(ClientsPushUpsertDialogComponent, this.#injector),
      {
        data,
        size: 'l',
      }
    );

    dialog.pipe(take(1)).subscribe();
  }
}
