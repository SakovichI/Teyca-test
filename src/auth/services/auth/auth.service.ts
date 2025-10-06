import { Router } from '@angular/router';
import { inject, Injectable, signal } from '@angular/core';
import { AuthConfig, OAuthService, TokenResponse } from 'angular-oauth2-oidc';
import { from, map, Observable, of, Subject, take, tap } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { AuthToken } from '../../models';
import { AUTH_BASE_PATH } from '../../constants';
import { LoginFormValue } from '../../../app/components/login/models';

@Injectable({ providedIn: 'root' })
export class AuthService {
  readonly #oauthService = inject(OAuthService);
  readonly #http = inject(HttpClient);
  readonly #router = inject(Router);

  readonly #isLoggedInSignal = signal(false);

  readonly $isLoggedIn = this.#isLoggedInSignal.asReadonly();

  get hasValidAccessToken(): boolean {
    return !!this.accessToken;
  }

  get accessToken(): string {
    const token = localStorage.getItem('authToken') ?? '';
    return token;
  }

  login(): void {
    this.#oauthService.initLoginFlow();
  }

  loginWithCredentials(data: LoginFormValue): Observable<AuthToken> {
    return this.#http.post<AuthToken>(`${AUTH_BASE_PATH}`, data).pipe(
      tap((token) => {
        localStorage.setItem('authToken', token.authToken);
        this.#setIsLoggedIn(Boolean(token.authToken));
      })
    );
  }

  logout(): void {
    localStorage.removeItem('authToken');
    this.#router.navigate(['/login']);
    this.#setIsLoggedIn(false);
  }

  setConfig(authConfig: AuthConfig): void {
    this.#oauthService.configure(authConfig);
  }

  #setIsLoggedIn = (isLoggedIn: boolean): void => {
    this.#isLoggedInSignal.set(isLoggedIn);
  };
}
