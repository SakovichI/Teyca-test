import { provideAnimations } from '@angular/platform-browser/animations';
import {
  ApplicationConfig,
  importProvidersFrom,
  provideZonelessChangeDetection,
} from '@angular/core';
import { provideOAuthClient } from 'angular-oauth2-oidc';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { provideErrors, provideInitializer } from '../core/providers';
import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { authInterceptor } from '../auth/interceptors';
import { transformPropertiesInterceptor } from '../core/interseptors';
import { TuiRootModule } from '@taiga-ui/core';

export const appConfig: ApplicationConfig = {
  providers: [
    provideAnimations(),
    importProvidersFrom(TuiRootModule),
    provideRouter(routes),
    provideZonelessChangeDetection(),
    provideOAuthClient(),
    provideInitializer(),
    provideHttpClient(withInterceptors([authInterceptor, transformPropertiesInterceptor])),
    provideErrors(),
  ],
};
