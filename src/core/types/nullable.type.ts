export type Nullable<T> = T | null;

export type NullableProperties<T> = {
  [P in keyof T]: Nullable<T[P]>;
};
