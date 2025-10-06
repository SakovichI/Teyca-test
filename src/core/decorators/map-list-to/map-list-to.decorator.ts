import { plainToClassFromExist, plainToInstance } from 'class-transformer';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { Constructor, EntityList } from '../../models';

export const MapListTo =
  <ItemType>(ItemClass: Constructor<ItemType>) =>
  <MethodType extends (...args: any[]) => Observable<EntityList<ItemType> | ItemType[]>>(
    _target: any,
    _methodName: string | symbol,
    descriptor: TypedPropertyDescriptor<MethodType>
  ): TypedPropertyDescriptor<MethodType> => {
    const originalMethod = descriptor.value;

    descriptor.value = function (this: any, ...args: any[]) {
      const toList = (
        data: EntityList<ItemType> | ItemType[]
      ): EntityList<ItemType> | ItemType[] => {
        if (Array.isArray(data)) {
          const model = plainToInstance(ItemClass, data);

          return model;
        }

        const model = plainToClassFromExist(new EntityList<ItemType>(ItemClass), data);

        return model;
      };

      return originalMethod?.apply(this, args).pipe(map(toList));
    } as MethodType;

    return descriptor;
  };
