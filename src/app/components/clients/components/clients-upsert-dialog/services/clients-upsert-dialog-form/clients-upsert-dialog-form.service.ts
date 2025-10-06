import { Injectable } from '@angular/core';
import { BaseFormService } from '../../../../../../../core/services';
import { FormGroup, Validators } from '@angular/forms';
import { ClientUpsertForm } from '../../models';
import { Client } from '../../../../../../api';

@Injectable()
export class ClientsUpsertFormService extends BaseFormService<ClientUpsertForm> {
  initForm(client?: Partial<Client>): FormGroup<ClientUpsertForm> {
    const {
      firstName = '',
      lastName = '',
      template = 'Тестовый',
      city = '',
      gender = '',
      phone = '',
      email = '',
    } = client || {};

    const form = this.fb.group<ClientUpsertForm>({
      firstName: this.fb.control(firstName, { nonNullable: true, validators: Validators.required }),
      lastName: this.fb.control(lastName, { nonNullable: true, validators: Validators.required }),
      template: this.fb.control(template, { nonNullable: true, validators: Validators.required }),
      city: this.fb.control(city, { nonNullable: true, validators: Validators.required }),
      gender: this.fb.control(gender, { nonNullable: true, validators: Validators.required }),
      phone: this.fb.control(phone, { nonNullable: true, validators: Validators.required }),
      email: this.fb.control(email, {
        nonNullable: true,
        validators: [Validators.required, Validators.email],
      }),
    });

    this.setForm(form);

    return this.$form();
  }
}
