import { combineLatest, from, Observable, ObservableInput } from 'rxjs';
import { map } from 'rxjs/operators';
import { ObjectEntry } from '../../types';

export const combineLatestIntoObject = <T, P extends keyof T = keyof T>(
  sources: Record<P, ObservableInput<T[P]>>
): Observable<T> => {
  const toEntry = (key: string) => {
    return (value: T[P]): ObjectEntry<T[P]> => [key, value];
  };
  const toObject = (entries: ObjectEntry<T[P]>[]): T => {
    return Object.fromEntries(entries) as T;
  };

  const toEntryObservable = ([key, value]: ObjectEntry<ObservableInput<T[P]>>): Observable<
    ObjectEntry<T[P]>
  > => {
    return from(value).pipe(map(toEntry(key)));
  };
  const entries: ObjectEntry<ObservableInput<T[P]>>[] = Object.entries(sources);

  return combineLatest(entries.map(toEntryObservable)).pipe(map(toObject));
};
