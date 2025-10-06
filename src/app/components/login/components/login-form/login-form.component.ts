import { Component, input, OnInit } from '@angular/core';
import { FormGroup, ReactiveFormsModule } from '@angular/forms';
import { LoginForm } from '../../models';
import { TuiFieldErrorPipeModule, TuiInputModule, TuiInputPasswordModule } from '@taiga-ui/kit';
import {
  TuiErrorModule,
  TuiLabelModule,
  TuiLoaderModule,
  TuiTextfieldControllerModule,
} from '@taiga-ui/core';
import { AsyncPipe } from '@angular/common';

@Component({
  selector: 'app-login-form',
  imports: [
    ReactiveFormsModule,
    TuiInputModule,
    TuiLabelModule,
    TuiTextfieldControllerModule,
    TuiFieldErrorPipeModule,
    TuiInputPasswordModule,
    AsyncPipe,
    TuiErrorModule,
  ],
  templateUrl: './login-form.component.html',
  styleUrl: './login-form.component.scss',
})
export class LoginFormComponent {
  readonly $form = input.required<FormGroup<LoginForm>>({ alias: 'form' });
}
