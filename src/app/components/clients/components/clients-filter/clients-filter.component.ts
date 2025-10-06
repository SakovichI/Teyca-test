import { Component, inject, OnInit } from '@angular/core';
import { ClientsFiltersForm } from '../../models';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { TuiLabelModule, TuiTextfieldControllerModule } from '@taiga-ui/core';
import { TuiInputModule } from '@taiga-ui/kit';
import { BindFormQueryParamsDirective } from '../../../../../core/directives';

@Component({
  selector: 'app-clients-filter',
  imports: [
    ReactiveFormsModule,
    TuiLabelModule,
    TuiTextfieldControllerModule,
    BindFormQueryParamsDirective,
    TuiInputModule,
  ],
  templateUrl: './clients-filter.component.html',
  styleUrl: './clients-filter.component.scss',
})
export class ClientsFilterComponent {
  readonly #fb = inject(FormBuilder);

  readonly form: FormGroup<ClientsFiltersForm> = this.#initForm();

  #initForm(): FormGroup<ClientsFiltersForm> {
    return this.#fb.group<ClientsFiltersForm>({
      search: this.#fb.control('', { nonNullable: true }),
    });
  }
}
