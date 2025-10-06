import { inject } from '@angular/core';
import { CanActivateFn, Router, UrlTree } from '@angular/router';
import { AuthService } from '../../services';

export const authGuard: CanActivateFn = (): boolean | UrlTree => {
  const authService = inject(AuthService);
  const router = inject(Router);

  const isLoggedIn = authService.hasValidAccessToken;

  return isLoggedIn ? true : router.createUrlTree(['/login']);
};
