import { camelCase, snakeCase, isArray } from 'lodash-es';

type Mode = 'camelCase' | 'snakeCase';

const modesMap: Map<Mode, (key: string) => string> = new Map([
  ['camelCase', camelCase],
  ['snakeCase', snakeCase],
]);

const isObject = (entity: unknown): entity is Record<string, unknown> =>
  !isArray(entity) && typeof entity === 'object';

const toTransformedArray = (entity: Array<unknown>, mode: Mode): Array<unknown> => {
  const toTransformedItem = (item: unknown): unknown => transformKeys(item, mode);

  return entity.map(toTransformedItem);
};

const toTransformedObject = (
  entity: Record<string, unknown>,
  mode: Mode
): Record<string, unknown> => {
  const transformerFunction = modesMap.get(mode);

  if (!transformerFunction) return entity;

  const toNewObject = (
    newObject: Record<string, unknown>,
    key: string
  ): Record<string, unknown> => {
    const preservedUpperCaseKey = key === key.toUpperCase() ? key : transformerFunction(key);

    newObject[preservedUpperCaseKey] = transformKeys(entity[key], mode);

    return newObject;
  };

  return Object.keys(entity).reduce(toNewObject, {});
};

export const transformKeys = (entity: unknown, mode: Mode = 'camelCase'): unknown => {
  if (!entity || entity instanceof FormData || entity instanceof File || entity instanceof Blob)
    return entity;

  if (isObject(entity)) {
    return toTransformedObject(entity, mode);
  }

  if (isArray(entity)) {
    return toTransformedArray(entity, mode);
  }

  return entity;
};
