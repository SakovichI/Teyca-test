import { FilterValues } from './../../../../../core/types/filter-values.type';
import { Params } from '@angular/router';
import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { filter, map, Observable } from 'rxjs';
import { MapListTo, MapTo } from '../../../../../core/decorators';
import { Client } from '../../models';
import { EntityList, ListQueryParams } from '../../../../../core/models';
import { CLIENT_API_BASE_PATH } from '../../constants';
import { mapInstanceToPlain, toResult } from '../../../../../core/helpers';
import { AuthService } from '../../../../../auth/services';

export interface PushMessageRequest {
  clientIds: string[];
  title: string;
  message: string;
}

@Injectable({
  providedIn: 'root',
})
export class ClientApiService {
  readonly #http = inject(HttpClient);
  readonly #authService = inject(AuthService);

  getCLients(params?: ListQueryParams<Client>): Observable<Client[]> {
    return this.getClientsList(params).pipe(map(toResult));
  }

  @MapListTo(Client)
  getClientsList({ pagination, filterValues }: ListQueryParams<Client> = {}): Observable<
    EntityList<Client>
  > {
    const search = filterValues?.['search'] ? { search: `phone=${filterValues['search']}` } : null;

    const params = {
      ...(pagination && { ...pagination }),
      ...search,
    };

    return this.#http.get<EntityList<Client>>(
      `${CLIENT_API_BASE_PATH(this.#authService.accessToken)}`,
      {
        params,
      } as any
    ) as unknown as Observable<EntityList<Client>>;
  }

  @MapTo(Client)
  getClient(id: string): Observable<Client> {
    return this.#http.get<Client>(
      `${CLIENT_API_BASE_PATH(this.#authService.accessToken)}/userid/${id}`
    );
  }

  addClient(client: Partial<Client>): Observable<Client> {
    const transformedClient = mapInstanceToPlain(Client, client);

    return this.#http.post<Client>(
      `${CLIENT_API_BASE_PATH(this.#authService.accessToken)}`,
      transformedClient
    );
  }

  updateClient(id: string, client: Partial<Client>): Observable<Client> {
    const transformedClient = mapInstanceToPlain(Client, client);

    return this.#http.put<Client>(
      `${CLIENT_API_BASE_PATH(this.#authService.accessToken)}/${id}`,
      transformedClient
    );
  }

  deleteClient(id: string): Observable<void> {
    return this.#http.delete<void>(`${CLIENT_API_BASE_PATH(this.#authService.accessToken)}/${id}`);
  }
}
