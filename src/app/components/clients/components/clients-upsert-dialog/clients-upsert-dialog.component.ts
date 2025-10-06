import { ChangeDetectionStrategy, Component, inject, OnInit } from '@angular/core';
import { TuiButtonModule, TuiDialogCloseService, TuiLoaderModule } from '@taiga-ui/core';
import { CloseConfirmationDialogHandler } from '../../../../../core/classes';
import { FormGroup } from '@angular/forms';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { ClientUpsertForm, ClientUpsertFormValue } from './models';
import { ClientsUpsertDialogService, ClientsUpsertFormService } from './services';
import { ClientsUpsertDialogFormComponent } from './componetns';

@Component({
  selector: 'app-clients-upsert-dialog',
  imports: [TuiButtonModule, TuiLoaderModule, ClientsUpsertDialogFormComponent],
  templateUrl: './clients-upsert-dialog.component.html',
  styleUrl: './clients-upsert-dialog.component.scss',
  providers: [TuiDialogCloseService, ClientsUpsertDialogService, ClientsUpsertFormService],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ClientsUpsertDialogComponent
  extends CloseConfirmationDialogHandler<ClientUpsertFormValue, FormGroup<ClientUpsertForm>>
  implements OnInit
{
  readonly #clientUpsertService = inject(ClientsUpsertDialogService);

  readonly $isSaving = this.#clientUpsertService.$isSaving;
  readonly $isLoaded = this.#clientUpsertService.$isLoaded;
  readonly $form = this.#clientUpsertService.$form;
  readonly $isEditable = this.#clientUpsertService.$isEditable;

  ngOnInit(): void {
    this.#initData();
  }

  #initData(): void {
    this.#clientUpsertService.initData().pipe(takeUntilDestroyed(this.destroyRef)).subscribe();
  }

  onSave(): void {
    this.#clientUpsertService
      .save(this.$form().getRawValue())
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe(() => this.close());
  }

  onDelete(): void {
    this.#clientUpsertService
      .delete()
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe(() => this.close());
  }

  onClose(): void {
    this.close();
  }
}
