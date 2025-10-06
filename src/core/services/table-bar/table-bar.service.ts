import { inject, Injectable } from '@angular/core';
import { TuiTableBarsService } from '@taiga-ui/addon-tablebars';
import { PolymorpheusContent } from '@tinkoff/ng-polymorpheus';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class TableBarService {
  readonly #tableBarsService = inject(TuiTableBarsService);

  show(tableBarTemplate: PolymorpheusContent): Observable<never> {
    return this.#tableBarsService.open(tableBarTemplate, {
      hasCloseButton: true,
      adaptive: false,
    });
  }
}
