import { Injectable, signal } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class EnvironmentService {
  readonly #urlSignal = signal('');

  readonly $url = this.#urlSignal.asReadonly();

  setUrl(url: string): void {
    this.#urlSignal.set(url);
  }
}
