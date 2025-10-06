import { ClientsPushUpsertDialogFormComponent } from './components/clients-push-upsert-dialog-form/clients-push-upsert-dialog-form.component';
import { ChangeDetectionStrategy, Component, inject, OnInit } from '@angular/core';
import { TuiButtonModule, TuiDialogCloseService, TuiDialogContext } from '@taiga-ui/core';
import { ClientsPushUpsertDialogService, ClientsPushUpsertFormService } from './service';
import { Client } from '../../../../api';
import { CloseConfirmationDialogHandler } from '../../../../../core/classes';
import { ClientPushForm, ClientPushFormValue } from './models';
import { FormGroup } from '@angular/forms';
import { PushMessageApiService } from '../../../../api/push-message';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

@Component({
  selector: 'app-clients-push-upsert-dialog',
  imports: [ClientsPushUpsertDialogFormComponent, TuiButtonModule],
  templateUrl: './clients-push-upsert-dialog.component.html',
  styleUrl: './clients-push-upsert-dialog.component.scss',
  providers: [
    ClientsPushUpsertDialogService,
    TuiDialogCloseService,
    ClientsPushUpsertFormService,
    PushMessageApiService,
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ClientsPushUpsertDialogComponent
  extends CloseConfirmationDialogHandler<
    ClientPushFormValue,
    FormGroup<ClientPushForm>,
    TuiDialogContext<void, Client[]>
  >
  implements OnInit
{
  readonly #clientPushUpsertDialogService = inject(ClientsPushUpsertDialogService);

  readonly $form = this.#clientPushUpsertDialogService.$form;
  readonly $isSaving = this.#clientPushUpsertDialogService.$isSaving;

  ngOnInit(): void {
    this.#initData();
  }

  #initData(): void {
    this.#clientPushUpsertDialogService.initData(this.context.data);
  }

  onSendPush(): void {
    this.#clientPushUpsertDialogService
      .sendPush(this.$form().getRawValue())
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe(() => this.close());
  }

  onClose(): void {
    this.close();
  }
}
