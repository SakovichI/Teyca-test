import { inject, Injectable, signal } from '@angular/core';
import { Client } from '../../../../../../api';
import { toId } from '../../../../../../../core/helpers';
import { ClientsPushUpsertFormService } from '../clients-push-upsert-form';
import { ClientPushFormValue } from '../../models';
import { catchError, finalize, Observable, of, take, tap } from 'rxjs';
import { PushMessageApiService, PushMessageResponse } from '../../../../../../api/push-message';
import { NotificationsService } from '../../../../../../../core/services';
import { HttpErrorResponse } from '@angular/common/http';
import { Nullable } from '../../../../../../../core/types';

@Injectable()
export class ClientsPushUpsertDialogService {
  readonly #pushMessageApiService = inject(PushMessageApiService);
  readonly #clientsPushUpsertFormService = inject(ClientsPushUpsertFormService);
  readonly #notificationsService = inject(NotificationsService);

  readonly #isSavingSignal = signal(false);

  readonly $isSaving = this.#isSavingSignal.asReadonly();
  readonly $form = this.#clientsPushUpsertFormService.$form;

  initData(clients: Client[]) {
    const clientsIds = clients.map(toId).join();

    this.#clientsPushUpsertFormService.initForm(clientsIds);
  }

  sendPush(data: ClientPushFormValue): Observable<Nullable<PushMessageResponse>> {
    this.setIsSaving(true);
    const showSuccess = (resp: PushMessageResponse): void => this.#handleSuccess(resp);
    const handleError = (error: HttpErrorResponse): Observable<null> => this.#handleError(error);

    return this.#pushMessageApiService
      .sendPushMessage(data)
      .pipe(tap(showSuccess), catchError(handleError), finalize(this.setIsSaving.bind(this)));
  }

  setIsSaving = (isSaving = false): void => this.#isSavingSignal.set(isSaving);

  #handleSuccess(response: PushMessageResponse): void {
    const label = response.usersCount > 1 ? ` Клиентам` : `Клиенту`;

    this.#notificationsService
      .showSuccess(`${response.usersCount} ${label} будет отправлено PUSH уведомление`)
      .pipe(take(1))
      .subscribe();
  }

  #handleError(error: HttpErrorResponse): Observable<null> {
    this.#notificationsService
      .showError(`Не удалось отправить Push уведомления: ${error.error}`)
      .pipe(take(1))
      .subscribe();

    return of(null);
  }
}
