import { PolymorpheusContent } from '@tinkoff/ng-polymorpheus';
import { Observable } from 'rxjs';

export const VALIDATION_ERRORS: Record<
  string,
  PolymorpheusContent<unknown> | Observable<PolymorpheusContent<unknown>>
> = {
  required: 'Поле обязательно для заполнения',
};
