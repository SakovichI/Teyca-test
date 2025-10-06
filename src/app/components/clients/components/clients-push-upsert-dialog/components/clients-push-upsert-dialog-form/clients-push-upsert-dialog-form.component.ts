import { AsyncPipe } from '@angular/common';
import { ChangeDetectionStrategy, Component, Injectable, input, OnInit } from '@angular/core';
import { FormGroup, ReactiveFormsModule } from '@angular/forms';
import { TuiErrorModule, TuiLabelModule, TuiTextfieldControllerModule } from '@taiga-ui/core';
import {
  TUI_DATE_TIME_VALUE_TRANSFORMER,
  TuiFieldErrorPipeModule,
  TuiInputDateTimeModule,
  TuiTextareaModule,
} from '@taiga-ui/kit';
import { ClientPushForm } from '../../models';
import { NativeDateTimeTransformerDirective } from '../../../../../../../core/directives/native-date-transformer';

@Component({
  selector: 'app-clients-push-upsert-dialog-form',
  imports: [
    ReactiveFormsModule,
    TuiTextareaModule,
    TuiLabelModule,
    TuiTextfieldControllerModule,
    TuiFieldErrorPipeModule,
    AsyncPipe,
    TuiErrorModule,
    TuiInputDateTimeModule,
    NativeDateTimeTransformerDirective,
  ],
  templateUrl: './clients-push-upsert-dialog-form.component.html',
  styleUrl: './clients-push-upsert-dialog-form.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ClientsPushUpsertDialogFormComponent implements OnInit {
  readonly $form = input.required<FormGroup<ClientPushForm>>({ alias: 'form' });

  ngOnInit(): void {
    this.$form().controls.dateStart.valueChanges.subscribe((value) => {
      console.log(value);
    });
  }
}
