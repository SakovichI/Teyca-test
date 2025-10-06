import { HttpRequest } from '@angular/common/http';
import { environment } from '../../../environments';

export const isInternalApiUrl = (req: HttpRequest<unknown>): boolean => {
  return req.url.startsWith('/') || req.url.startsWith(environment.devUrl);
};
