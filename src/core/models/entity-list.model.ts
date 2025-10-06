import { Exclude, Type, TypeHelpOptions } from 'class-transformer';

import { Constructor } from './constructor.model';

const getItemType = <T>(options?: TypeHelpOptions): Constructor<T> => options?.newObject.type;

export class EntityList<T> {
  @Exclude() private type: Constructor<T>;
  @Type(getItemType) passes: T[] = [];

  meta?: EntityListPagination;

  constructor(type: Constructor<T>) {
    this.type = type;
  }
}

export interface EntityListPagination {
  offset: number;
  limit: number;
  size: number;
}
