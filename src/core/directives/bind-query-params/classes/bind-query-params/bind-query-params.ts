import { DestroyRef, inject } from '@angular/core';
import { Params, Router } from '@angular/router';
import { Nullable } from '../../../../types';

export class BindQueryParams {
  readonly #router = inject(Router);
  protected readonly destroyRef = inject(DestroyRef);

  protected updateQueryParams(queryParams: Nullable<Params>): void {
    this.#router.navigate([], {
      queryParams,
      queryParamsHandling: 'merge',
      replaceUrl: true,
    });
  }
}
