import { Observable } from 'rxjs';

export interface ListDataSourceAdapter {
  refresh: () => Observable<void>;
}
