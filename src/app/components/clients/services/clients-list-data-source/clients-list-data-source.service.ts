import { inject, Injectable } from '@angular/core';
import { ListDataSource } from '../../../../../core/classes';
import { Client, ClientApiService } from '../../../../api';
import { ClientsFilterFormValue } from '../../models';
import { Observable } from 'rxjs';
import { ListQueryParams, EntityList } from '../../../../../core/models';
import { FilterValues } from '../../../../../core/types';

@Injectable()
export class ClientsListDataSourceService extends ListDataSource<Client, ClientsFilterFormValue> {
  readonly #clientsApiService = inject(ClientApiService);

  getApiData(
    params: ListQueryParams<Client, ClientsFilterFormValue>
  ): Observable<EntityList<Client>> {
    const { search = '' } = params.filterValues || {};

    const filterValues: FilterValues = {
      search,
    };

    const transformedParams: ListQueryParams<Client> = { ...params, filterValues };

    return this.#clientsApiService.getClientsList(transformedParams);
  }
}
