import {
  ChangeDetectionStrategy,
  Component,
  DestroyRef,
  OnInit,
  inject,
  viewChild,
} from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { RouterLink, RouterOutlet } from '@angular/router';
import { AuthService } from '../../../auth/services';
import { ClientsServices } from './services/clients/clients.service';
import { TuiAvatarModule } from '@taiga-ui/kit';
import { TuiButtonModule } from '@taiga-ui/core';
import { ClientsFilterComponent, ClientsTableComponent } from './components';
import { ClientsListDataSourceService } from './services';
import { ClientsFiltersForm } from './models';
import { TableSelectionService } from '../../../core/services';
import { Client } from '../../api';

@Component({
  selector: 'app-clients',
  imports: [
    TuiAvatarModule,
    TuiButtonModule,
    ClientsTableComponent,
    RouterLink,
    RouterOutlet,
    ClientsFilterComponent,
  ],
  templateUrl: './clients.component.html',
  styleUrl: './clients.component.scss',
  providers: [ClientsServices, ClientsListDataSourceService, TableSelectionService],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ClientsComponent implements OnInit {
  readonly destroyRef = inject(DestroyRef);
  readonly #authService = inject(AuthService);
  readonly #clientService = inject(ClientsServices);
  readonly #clientsListDataSourceService = inject(ClientsListDataSourceService);

  readonly $data = this.#clientsListDataSourceService.$data;
  readonly $isEmptyData = this.#clientsListDataSourceService.$isEmptyData;
  readonly $isLoading = this.#clientsListDataSourceService.$isLoading;
  readonly $pagesLength = this.#clientsListDataSourceService.$pagesLength;
  readonly $pageIndex = this.#clientsListDataSourceService.$pageIndex;

  readonly $tableComponent = viewChild.required(ClientsTableComponent);
  readonly $filterComponent = viewChild.required(ClientsFilterComponent);

  ngOnInit(): void {
    this.#initDataSource();
  }

  onLogout(): void {
    this.#authService.logout();
  }

  onTriggerAction(selectedClients: Client[]): void {
    this.#clientService.openPushMessageDialog(selectedClients);
  }

  #initDataSource(): void {
    this.#clientsListDataSourceService.initDataSource({
      tableComponent: this.$tableComponent(),
      form: this.$filterComponent().form,
    });
  }
}
