import {
  TuiDirectionOrderDirective,
  TuiSortByDirective,
  TuiTableDirective,
} from '@taiga-ui/addon-table';

import { input, viewChild, Directive } from '@angular/core';
import { Identifiable } from '../../models';
import { TuiPaginationComponent } from '@taiga-ui/kit';

@Directive()
export class Table<T extends Identifiable> {
  $sort = viewChild(TuiSortByDirective);
  $direction = viewChild(TuiDirectionOrderDirective);
  $pagination = viewChild(TuiPaginationComponent);
  $table = viewChild<TuiTableDirective<T>>(TuiTableDirective);

  $data = input.required<T[]>({ alias: 'data' });
  $isLoading = input.required<boolean>({ alias: 'isLoading' });
  $pageIndex = input.required<number>({ alias: 'pageIndex' });
  $pagesLength = input.required<number>({ alias: 'pagesLength' });
}
