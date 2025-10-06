import { Injectable, inject } from '@angular/core';
import { TuiBaseDialogContext } from '@taiga-ui/cdk';
import { TuiAlertOptions, TuiAlertService } from '@taiga-ui/core';
import { PolymorpheusComponent, PolymorpheusContent } from '@tinkoff/ng-polymorpheus';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class NotificationsService {
  readonly #alertService = inject(TuiAlertService);

  open<T, O = unknown, R = void>(
    component: PolymorpheusComponent<T>,
    options?: Partial<TuiAlertOptions<O>>
  ): Observable<R> {
    return this.#open(component, options);
  }

  showInfo(message: string): Observable<void> {
    return this.#open(message, { status: 'info' });
  }

  showSuccess(message: string): Observable<void> {
    return this.#open(message, { status: 'success' });
  }

  showWarning(message: string): Observable<void> {
    return this.#open(message, { status: 'warning' });
  }

  showError(message: string): Observable<void> {
    return this.#open(message, { status: 'error' });
  }

  #open<T = void, O = unknown>(
    content: PolymorpheusContent<TuiAlertOptions<O> & TuiBaseDialogContext<void>>,
    options?: Partial<TuiAlertOptions<O>>
  ): Observable<T> {
    return this.#alertService.open<T>(content, options);
  }
}
