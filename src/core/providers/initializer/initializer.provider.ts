import { routes } from './../../../app/components/clients/clients.routes';
import { APP_INITIALIZER, FactoryProvider, Injector } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable, of } from 'rxjs';
import { environment } from '../../../environments';
import { AuthService } from '../../../auth/services';
import { EnvironmentService } from '../../services';
import { Nullable } from '../../types';
import { AUTH_CONFIG } from '../../../auth/constants';

const initializerFactory = (injector: Injector, environmentService: EnvironmentService) => {
  return (): Observable<Nullable<boolean>> => {
    const url = environment.devUrl;

    environmentService.setUrl(url);
    const authService = injector.get(AuthService);
    const router = injector.get(Router);
    const isClientUrl = window.location.pathname.includes('clients');

    authService.setConfig(AUTH_CONFIG);

    if (authService.hasValidAccessToken && !isClientUrl) {
      router.navigate(['/clients']);
      return of(true);
    }

    return of(false);
  };
};

export const provideInitializer = (): FactoryProvider => ({
  provide: APP_INITIALIZER,
  useFactory: initializerFactory,
  multi: true,
  deps: [Injector, EnvironmentService],
});
