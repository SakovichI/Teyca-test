import { TransformFnParams, Transform } from 'class-transformer';
import { Nullable } from '../../types';

export const TransformDate: () => (target: object, key: string) => void = () => {
  const toISOFormat = (params: TransformFnParams): Nullable<string> => {
    params.value.setHours(params.value.getHours() + 3);
    return params.value ? params.value.toISOString() : null;
  };

  const toPlain: PropertyDecorator = Transform(toISOFormat, { toPlainOnly: true });

  const toDate = (params: TransformFnParams): Date | null =>
    params.value ? new Date(params.value) : null;

  const toClass = Transform(toDate, { toClassOnly: true });

  return (target: object, key: string) => {
    toPlain(target, key);
    toClass(target, key);
  };
};
