import { DirectionOrder, FilterValues, Nullable } from '../types';

import { EntityListPagination } from './entity-list.model';

export interface ListQueryParams<ItemType, FilterType = FilterValues> {
  directionOrder?: Nullable<DirectionOrder>;
  orderBy?: Nullable<string | keyof ItemType>;
  filterValues?: Nullable<FilterType>;
  pagination?: ListQueryParamsPagination;
}

export type ListQueryParamsPagination = Omit<EntityListPagination, 'size'>;
