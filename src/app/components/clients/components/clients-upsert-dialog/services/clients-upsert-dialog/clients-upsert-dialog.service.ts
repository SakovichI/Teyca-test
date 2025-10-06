import { ClientsUpsertFormService } from './../clients-upsert-dialog-form/clients-upsert-dialog-form.service';
import { inject, Injectable, signal } from '@angular/core';
import { NotificationsService } from '../../../../../../../core/services';
import {
  Client,
  CLIENT_ACTION_LABEL_MAP,
  ClientActionType,
  ClientApiService,
} from '../../../../../../api';
import { catchError, finalize, Observable, of, take, tap } from 'rxjs';
import { Nullable } from '../../../../../../../core/types';
import { ActivatedRoute } from '@angular/router';
import { FormGroup } from '@angular/forms';
import { ClientUpsertForm } from '../../models';
import { ClientsListDataSourceService } from '../../../../services';
import { HttpErrorResponse } from '@angular/common/http';

@Injectable()
export class ClientsUpsertDialogService {
  readonly #clientUpsertFormService = inject(ClientsUpsertFormService);
  readonly #clientApiService = inject(ClientApiService);
  readonly #clientsListDataSourceService = inject(ClientsListDataSourceService);
  readonly #notificationsService = inject(NotificationsService);
  readonly #route = inject(ActivatedRoute);

  readonly #id = this.#route.snapshot.paramMap.get('id');

  readonly $isEditable = signal(!!this.id).asReadonly();
  readonly #isSavingSignal = signal(false);
  readonly #isLoadedSignal = signal(true);

  readonly $isSaving = this.#isSavingSignal.asReadonly();
  readonly $isLoaded = this.#isLoadedSignal.asReadonly();
  readonly $form = this.#clientUpsertFormService.$form;

  get id(): string {
    return this.#id || '';
  }

  initData(): Observable<Nullable<Client>> {
    if (!this.$isEditable()) {
      this.#setIsLoaded();

      return of(null);
    }

    const initForm = (client: Client): FormGroup<ClientUpsertForm> =>
      this.#clientUpsertFormService.initForm(client);

    return this.#clientApiService
      .getClient(this.id)
      .pipe(tap(initForm), finalize(this.#setIsLoaded));
  }

  save(client: Partial<Client>): Observable<Nullable<Client> | void> {
    const actionType = this.id ? ClientActionType.Edit : ClientActionType.Add;
    const action$ = this.id
      ? this.#clientApiService.updateClient(this.id, client)
      : this.#clientApiService.addClient(client);

    return this.#handleAction(action$, actionType);
  }

  delete(): Observable<Nullable<Client> | void> {
    const action$ = this.#clientApiService.deleteClient(this.id!);

    return this.#handleAction(action$, ClientActionType.Delete);
  }

  #handleAction(
    action: Observable<Nullable<Client> | void>,
    actionType: ClientActionType
  ): Observable<Nullable<Client> | void> {
    this.#setIsSaving(true);

    const showSuccess = (): void => this.#handleSuccess(actionType);
    const handleError = (error: HttpErrorResponse): Observable<null> =>
      this.#handleError(error, actionType);

    const refresh = () => this.#clientsListDataSourceService.refresh();

    return action.pipe(
      tap(showSuccess),
      catchError(handleError),
      finalize(this.#setIsSaving),
      finalize(refresh)
    );
  }

  #handleSuccess(actionType: ClientActionType): void {
    const label = CLIENT_ACTION_LABEL_MAP[actionType];

    this.#notificationsService.showSuccess(`Удалось ${label} клиента`).pipe(take(1)).subscribe();
  }

  #handleError(error: HttpErrorResponse, actionType: ClientActionType): Observable<null> {
    const label = CLIENT_ACTION_LABEL_MAP[actionType];

    this.#notificationsService
      .showError(`Не удалось ${label} клиента: ${error.error}`)
      .pipe(take(1))
      .subscribe();

    return of(null);
  }

  #setIsSaving = (isSaving = false): void => this.#isSavingSignal.set(isSaving);

  #setIsLoaded = (isLoaded = false): void => this.#isLoadedSignal.set(isLoaded);
}
