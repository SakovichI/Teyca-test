import { Injectable, signal, inject, Signal } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup } from '@angular/forms';
import { Nullable } from '../../types';

@Injectable({ providedIn: 'root' })
export abstract class BaseFormService<F extends Record<string, AbstractControl>> {
  readonly #formSignal = signal<Nullable<FormGroup<F>>>(null);
  protected readonly fb = inject(FormBuilder);

  readonly $form = this.#formSignal.asReadonly() as Signal<FormGroup<F>>;

  constructor() {
    this.initForm();
  }

  updateValidity(): void {
    const form = this.$form();

    const updateValueAndValidity = (control: AbstractControl): void => {
      control.markAsTouched();
      control.updateValueAndValidity();
    };

    Object.values(form.controls).forEach(updateValueAndValidity);
    form.markAllAsTouched();
  }

  protected abstract initForm(data?: unknown): FormGroup<F>;

  protected setForm(form: FormGroup<F>): void {
    this.#formSignal.set(form);
  }
}
