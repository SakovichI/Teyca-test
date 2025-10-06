import {
  HttpErrorResponse,
  HttpEvent,
  HttpHandlerFn,
  HttpInterceptorFn,
  HttpRequest,
  HttpStatusCode,
} from '@angular/common/http';
import { Injector, inject } from '@angular/core';
import { Observable, catchError, throwError } from 'rxjs';
import { AuthService } from '../../services';
import { isInternalApiUrl } from '../../../core/helpers';
import { Router } from '@angular/router';

export const authInterceptor: HttpInterceptorFn = (
  request: HttpRequest<unknown>,
  next: HttpHandlerFn
) => {
  const injector = inject(Injector);

  return handleRequest(request, next, injector);
};

const handleRequest = (
  request: HttpRequest<unknown>,
  next: HttpHandlerFn,
  injector: Injector
): Observable<HttpEvent<unknown>> => {
  const authService = injector.get(AuthService);

  const isApiUrl = isInternalApiUrl(request) || request.url.startsWith('https://api.teyca.ru');
  if (authService.hasValidAccessToken && isApiUrl) {
    request = request.clone({ setHeaders: { Authorization: `${authService.accessToken}` } });
  }

  return next(request).pipe(catchError(handleError(injector, request, next)));
};

const handleError = (
  injector: Injector,
  request: HttpRequest<unknown>,
  next: HttpHandlerFn
): ((error: Error) => Observable<HttpEvent<unknown>>) => {
  const toRequestWithRefreshedToken = (): Observable<HttpEvent<unknown>> =>
    handleRequest(request, next, injector);

  return (error: Error): Observable<HttpEvent<unknown>> => {
    if (isUnauthorizedError(error)) {
      const authService = injector.get(AuthService);
      const router = injector.get(Router);
      authService.logout();
      router.navigate(['/login']);
    }

    return throwError(() => error);
  };
};

const isUnauthorizedError = (error: Error): boolean =>
  error instanceof HttpErrorResponse && error.status === HttpStatusCode.Unauthorized;

// refresh flow removed
