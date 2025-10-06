import {
  ChangeDetectionStrategy,
  Component,
  computed,
  output,
  OutputEmitterRef,
  signal,
} from '@angular/core';
import { Client } from '../../../../api';
import { SelectableTable } from '../../../../../core/classes';
import { TuiButtonModule, TuiLinkModule, TuiLoaderModule } from '@taiga-ui/core';
import {
  TuiComparator,
  TuiTableModule,
  tuiTablePaginationOptionsProvider,
} from '@taiga-ui/addon-table';
import { TuiPaginationModule } from '@taiga-ui/kit';
import { BindPaginationQueryParamsDirective } from '../../../../../core/directives';
import { DatePipe } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { TuiCheckboxModule } from '@taiga-ui/experimental';
import { ClientsTableBarComponent } from '../clients-table-bar';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-clients-table',
  imports: [
    FormsModule,
    TuiLoaderModule,
    TuiTableModule,
    TuiPaginationModule,
    BindPaginationQueryParamsDirective,
    DatePipe,
    TuiLinkModule,
    TuiCheckboxModule,
    ClientsTableBarComponent,
    TuiButtonModule,
    RouterLink,
  ],
  templateUrl: './clients-table.component.html',
  styleUrl: './clients-table.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [
    tuiTablePaginationOptionsProvider({
      showPages: false,
    }),
  ],
})
export class ClientsTableComponent extends SelectableTable<Client> {
  readonly actionClicked = output<Client[]>();

  readonly columns = [
    'checkbox',
    'userId',
    'oS',
    'template',
    'barcode',
    'lastName',
    'firstName',
    'phone',
    'discount',
    'bonus',
    'summAll',
    'link',
    'createdAt',
    'actions',
  ];

  onTriggerAction(): void {
    this.actionClicked.emit(this.$selectedItems());
  }
}
