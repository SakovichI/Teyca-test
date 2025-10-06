import { Provider } from '@angular/core';
import { TUI_VALIDATION_ERRORS } from '@taiga-ui/kit';
import { VALIDATION_ERRORS } from '../constants';

export const provideErrors = (): Provider => ({
  provide: TUI_VALIDATION_ERRORS,
  useValue: VALIDATION_ERRORS,
});
