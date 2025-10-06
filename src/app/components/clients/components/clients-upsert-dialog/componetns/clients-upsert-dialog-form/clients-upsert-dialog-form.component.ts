import { AsyncPipe } from '@angular/common';
import { Component, input } from '@angular/core';
import { FormGroup, ReactiveFormsModule } from '@angular/forms';
import { TuiErrorModule, TuiLabelModule, TuiTextfieldControllerModule } from '@taiga-ui/core';
import {
  TuiFieldErrorPipeModule,
  TuiInputModule,
  TuiInputPasswordModule,
  TuiInputPhoneModule,
} from '@taiga-ui/kit';
import { ClientUpsertForm } from '../../models';

@Component({
  selector: 'app-clients-upsert-dialog-form',
  imports: [
    ReactiveFormsModule,
    TuiInputModule,
    TuiLabelModule,
    TuiTextfieldControllerModule,
    TuiFieldErrorPipeModule,
    TuiInputPasswordModule,
    AsyncPipe,
    TuiErrorModule,
    TuiInputPhoneModule,
  ],
  templateUrl: './clients-upsert-dialog-form.component.html',
  styleUrl: './clients-upsert-dialog-form.component.scss',
})
export class ClientsUpsertDialogFormComponent {
  readonly $form = input.required<FormGroup<ClientUpsertForm>>({ alias: 'form' });
}
