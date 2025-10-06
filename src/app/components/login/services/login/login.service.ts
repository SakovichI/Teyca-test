import { inject, Injectable, signal } from '@angular/core';
import { LoginFormService } from '../login-form';
import { AuthService } from '../../../../../auth/services';
import { Router } from '@angular/router';
import { finalize, Observable, tap } from 'rxjs';
import { AuthToken } from '../../../../../auth/models';
import { FormGroup } from '@angular/forms';
import { LoginForm } from '../../models';

@Injectable()
export class LoginService {
  readonly #loginFormService = inject(LoginFormService);
  readonly #authService = inject(AuthService);
  readonly #router = inject(Router);

  readonly #isLoading = signal<boolean>(false);

  readonly $form = this.#loginFormService.$form;
  readonly $isLoading = this.#isLoading.asReadonly();

  constructor() {
    this.#initData();
  }

  login(): Observable<AuthToken> {
    this.#setLoading(true);
    const navigateToClients = (): void => {
      this.#router.navigate(['/clients']);
    };

    return this.#authService
      .loginWithCredentials(this.$form().getRawValue())
      .pipe(tap(navigateToClients), finalize(this.#setLoading.bind(this)));
  }

  #initData(): FormGroup<LoginForm> {
    return this.#loginFormService.initForm();
  }

  #setLoading(value = false) {
    this.#isLoading.set(value);
  }
}
