import { Nullable } from './nullable.type';

export type FilterValues = Record<
  string,
  Nullable<string | number | boolean | ReadonlyArray<string | number | boolean>>
>;
