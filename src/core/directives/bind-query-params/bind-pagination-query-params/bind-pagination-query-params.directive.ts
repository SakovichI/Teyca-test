import { Directive, OnInit, inject } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { TuiPaginationComponent } from '@taiga-ui/kit';
import { isNumber } from 'lodash-es';

import { BindQueryParams } from '../classes';
import { parseParams } from '../helpers';

@Directive({
  selector: '[mwBindPaginationQueryParams]',
  standalone: true,
})
export class BindPaginationQueryParamsDirective extends BindQueryParams implements OnInit {
  readonly #pageIndexKey = 'pageIndex';

  readonly #pagination = inject(TuiPaginationComponent);

  ngOnInit(): void {
    this.#patchPaginationValue();
    this.#handlePaginationValuesChanges();
  }

  #patchPaginationValue(): void {
    if (!location.search || !this.#pagination) return;

    const pageIndexValue = parseParams()[this.#pageIndexKey];

    if (!pageIndexValue || !isNumber(pageIndexValue)) return;

    this.#pagination.onElementClick(pageIndexValue);
  }

  #handlePaginationValuesChanges(): void {
    this.#pagination.indexChange
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe((value) => this.updateQueryParams({ [this.#pageIndexKey]: value }));
  }
}
