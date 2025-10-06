import { DestroyRef, Directive, inject, OnInit } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { AbstractControl, ControlValueAccessor, FormControl } from '@angular/forms';
import { distinctUntilChanged, filter } from 'rxjs';
import { Nullable } from '../../types';

@Directive()
export class CustomControl<T, V = T> implements ControlValueAccessor, OnInit {
  readonly #destroyRef = inject(DestroyRef);

  #isDisabled = false;

  onTouched: () => unknown;

  readonly control = new FormControl<Nullable<T>>(null);

  onChange: (value: Nullable<T | V>) => unknown = () => {};

  get isDisabled(): boolean {
    return this.#isDisabled;
  }

  ngOnInit(): void {
    this.handleControlValueChanges();
  }

  registerOnChange(fn: (value: Nullable<T | V>) => unknown): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: () => unknown): void {
    this.onTouched = fn;
  }

  setDisabledState(isDisabled: boolean): void {
    this.#isDisabled = isDisabled;

    if (isDisabled) {
      this.control.disable();
    } else {
      this.control.enable();
    }
  }

  validate(control: AbstractControl): null {
    if (control === this.control) return null;

    const validators = control.validator ? [control.validator] : [];

    this.control.setValidators(validators);
    this.#subscribeToParentValidation(control);

    return null;
  }

  writeValue(value: Nullable<T | V>): void {
    this.control.setValue(value as T);
  }

  protected handleControlValueChanges(): void {
    this.control.valueChanges
      .pipe(distinctUntilChanged(), takeUntilDestroyed(this.#destroyRef))
      .subscribe((value: Nullable<T | V>) => this.onChange(value));
  }

  #subscribeToParentValidation(control: AbstractControl): void {
    if (!control) return;

    const isInvalid = (status: string): boolean => status === 'INVALID';

    control.statusChanges
      .pipe(distinctUntilChanged(), filter(isInvalid), takeUntilDestroyed(this.#destroyRef))
      .subscribe(() => {
        this.control.markAsTouched();
        this.control.updateValueAndValidity();
      });
  }
}
