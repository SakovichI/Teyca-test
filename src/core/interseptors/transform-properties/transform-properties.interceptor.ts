import { HttpEvent, HttpInterceptorFn, HttpParams, HttpResponse } from '@angular/common/http';
import { snakeCase } from 'lodash-es';
import { filter, map, merge, share } from 'rxjs';

import { isInternalApiUrl, transformKeys } from '../../helpers';

type ToTransformedParams = (
  params: HttpParams
) => (transformedParams: HttpParams, paramName: string) => HttpParams;

const isNotEmptyQueryParam = (value: string): boolean => !['null', 'undefined'].includes(value);

const toTransformedParams: ToTransformedParams = (params) => (transformedParams, paramName) => {
  const setNewParam = (value: string): void => {
    transformedParams = transformedParams.append(snakeCase(paramName), value);
  };

  params.getAll(paramName)?.filter(isNotEmptyQueryParam).forEach(setNewParam);

  return transformedParams;
};

export const transformPropertiesInterceptor: HttpInterceptorFn = (req, next) => {
  if (!isInternalApiUrl(req)) return next(req);

  const isHttpResponse = (event: HttpEvent<unknown>): event is HttpResponse<unknown> =>
    event instanceof HttpResponse;
  const isNotHttpResponse = (event: HttpEvent<unknown>): boolean =>
    !(event instanceof HttpResponse);
  const toTransformedResponse = (response: HttpResponse<unknown>): HttpResponse<unknown> => {
    return response.clone({ body: transformKeys(response.body) });
  };
  const transformedParams = req.params
    .keys()
    .reduce(toTransformedParams(req.params), new HttpParams());
  const transformedBody = transformKeys(req.body, 'snakeCase');

  const request$ = next(req.clone({ params: transformedParams, body: transformedBody })).pipe(
    share()
  );
  const httpResponse$ = request$.pipe(filter(isHttpResponse), map(toTransformedResponse));
  const httpEvents$ = request$.pipe(filter(isNotHttpResponse));

  return merge(httpResponse$, httpEvents$);
};
