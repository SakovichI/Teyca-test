import { FormArray, FormControl, FormGroup } from '@angular/forms';

import { Nullable } from './nullable.type';

type ControlForArray<T> = T extends Array<infer U>
  ? U extends Record<any, any>
    ? FormArray<FormGroup<ControlsOf<U>>>
    : FormArray<FormControl<U>>
  : never;

type ControlForObject<T> = T extends Record<any, any> ? FormGroup<ControlsOf<T>> : never;

type ControlForValue<T> = ControlForArray<T> extends never
  ? ControlForObject<T> extends never
    ? FormControl<T>
    : ControlForObject<T>
  : ControlForArray<T>;

export type ControlsOf<T extends Record<string, any>, C extends keyof T = never> = {
  [K in keyof T]: K extends C
    ? T[K] extends Record<string, unknown>
      ? FormControl<Nullable<T[K]>>
      : FormControl<T[K]>
    : ControlForValue<T[K]>;
};
