import { Injectable } from '@angular/core';
import { BaseFormService } from '../../../../../../../core/services';
import { ClientPushForm } from '../../models';
import { FormGroup, Validators } from '@angular/forms';
import { Nullable } from '../../../../../../../core/types';
import { TuiDay } from '@taiga-ui/cdk';

@Injectable()
export class ClientsPushUpsertFormService extends BaseFormService<ClientPushForm> {
  initForm(userIds: string): FormGroup<ClientPushForm> {
    const form = this.fb.group({
      userId: this.fb.control(userIds, { nonNullable: true }),
      pushMessage: this.fb.control('', { nonNullable: true, validators: Validators.required }),
      dateStart: this.fb.control<Nullable<Date>>(null),
    });

    this.setForm(form);

    return this.$form();
  }
}
