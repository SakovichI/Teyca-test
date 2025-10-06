import { FormGroup } from '@angular/forms';

import { Identifiable } from '../../../models';

import { Table } from '../../table';

export interface ListDataSourceOptions<T extends Identifiable> {
  tableComponent: Table<T>;
  form: FormGroup;
}
