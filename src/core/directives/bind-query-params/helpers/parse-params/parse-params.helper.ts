import { ObjectEntry } from '../../../../types';
import { ParsedParams, ParsedParamsValue } from '../../types';

const isString = (value: string): boolean => {
  const isPhoneNumber = value.startsWith('+');

  if (isPhoneNumber) return !!isPhoneNumber;

  const isNotNull = value !== 'null';
  const isNotArray = !value.startsWith('[');
  const isNotObject = !value.startsWith('{');
  const isNotNumeric = isNaN(Number(value));

  return isNotNull && isNotArray && isNotObject && isNotNumeric;
};

export const parseParams = (): ParsedParams => {
  const queryParams = [...new URLSearchParams(location.search).entries()];
  const toParsedValue = ([key, currentValue]: [string, string]): ObjectEntry<ParsedParamsValue> => {
    if (isString(currentValue)) return [key, currentValue];

    if (!isNaN(Number(currentValue))) return [key, currentValue];

    try {
      return [key, JSON.parse(currentValue)];
    } catch {
      return [key, null];
    }
  };

  return Object.fromEntries(queryParams.map(toParsedValue));
};
