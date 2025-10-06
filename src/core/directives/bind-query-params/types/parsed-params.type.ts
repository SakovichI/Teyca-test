import { Nullable } from '../../../types';

export type ParsedParamsValue = Nullable<
  string | number | boolean | ReadonlyArray<string | number | boolean>
>;

export type ParsedParams = Record<string, ParsedParamsValue>;
