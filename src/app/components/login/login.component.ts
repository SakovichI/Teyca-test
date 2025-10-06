import { ChangeDetectionStrategy, Component, DestroyRef, inject } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';

import { LoginFormService, LoginService } from './services';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { LoginFormComponent } from './components';
import { TuiButtonModule, TuiLoaderModule } from '@taiga-ui/core';
import { NgOptimizedImage } from '@angular/common';

@Component({
  selector: 'app-login',
  imports: [LoginFormComponent, TuiLoaderModule, TuiButtonModule, NgOptimizedImage],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
  providers: [LoginService, LoginFormService],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LoginComponent {
  readonly #loginService = inject(LoginService);
  readonly #destroyRef = inject(DestroyRef);

  readonly $form = this.#loginService.$form;
  readonly $isLoading = this.#loginService.$isLoading;

  onLogin(): void {
    this.#loginService.login().pipe(takeUntilDestroyed(this.#destroyRef)).subscribe();
  }
}
