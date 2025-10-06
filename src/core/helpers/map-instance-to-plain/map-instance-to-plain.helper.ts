import { instanceToPlain, plainToInstance } from 'class-transformer';
import { Constructor } from '../../models';

export const mapInstanceToPlain = <T>(
  SourceClass: Constructor<T>,
  sourceObject: T
): Record<string, unknown> => {
  return instanceToPlain<T>(plainToInstance<T, Partial<T>>(SourceClass, sourceObject));
};
