import { Directive, OnInit, inject } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { ControlContainer } from '@angular/forms';
import { isArray, isString } from 'lodash-es';
import { debounceTime } from 'rxjs';

import { BindQueryParams } from '../classes';
import { parseParams } from '../helpers';
import { DEBOUNCE_TIME_UI } from '../../../constants';
import { Nullable } from '../../../types';

@Directive({
  selector: '[mwBindFormQueryParams]',
  standalone: true,
})
export class BindFormQueryParamsDirective extends BindQueryParams implements OnInit {
  readonly #ngControl = inject(ControlContainer);

  ngOnInit(): void {
    this.#patchFormValues();
    this.#handleFormValuesChanges();
  }

  #patchFormValues(): void {
    if (!location.search || !this.#ngControl.control) return;

    const parsedValue = parseParams();

    this.#ngControl?.control.patchValue(parsedValue);
  }

  #handleFormValuesChanges(): void {
    this.#ngControl.control?.valueChanges
      .pipe(debounceTime(DEBOUNCE_TIME_UI), takeUntilDestroyed(this.destroyRef))
      .subscribe((value) => this.updateQueryParams(this.#resolveParams(value)));
  }

  #resolveParams(params: Record<string, unknown>): Record<string, Nullable<string>> {
    type ResolvedParams = Record<string, Nullable<string>>;
    type ToResolvedParams = (
      resolvedParams: ResolvedParams,
      [key, value]: [string, unknown]
    ) => ResolvedParams;

    const stringifyValue = (value: unknown): string =>
      isString(value) ? value : JSON.stringify(value);
    const toResolvedParams: ToResolvedParams = (resolvedParams, [key, value]) => {
      resolvedParams[key] = this.#isEmptyValue(value) ? null : stringifyValue(value);

      return resolvedParams;
    };

    return Object.entries(params).reduce(toResolvedParams, {});
  }

  #isEmptyValue(value: unknown): boolean {
    switch (typeof value) {
      case 'object':
        if (isArray(value)) return !value.length;

        return !value || !Object.keys(value).length;
      case 'string':
        return !value || value === '';
      case 'boolean':
        return !value;
      default:
        return false;
    }
  }
}
