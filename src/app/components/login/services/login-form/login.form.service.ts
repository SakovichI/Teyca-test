import { Injectable } from '@angular/core';
import { BaseFormService } from '../../../../../core/services';
import { LoginForm } from '../../models';
import { FormGroup, Validators } from '@angular/forms';

@Injectable()
export class LoginFormService extends BaseFormService<LoginForm> {
  initForm(): FormGroup<LoginForm> {
    const form = this.fb.group<LoginForm>({
      login: this.fb.control('', { nonNullable: true, validators: Validators.required }),
      password: this.fb.control('', { nonNullable: true, validators: Validators.required }),
    });

    this.setForm(form);

    return this.$form();
  }
}
