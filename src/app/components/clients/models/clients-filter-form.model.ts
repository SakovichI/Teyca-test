import { ControlsOf } from '../../../../core/types';

export interface ClientsFilterFormValue {
  search: string;
}

export type ClientsFiltersForm = ControlsOf<ClientsFilterFormValue>;
