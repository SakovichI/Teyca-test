import { ControlsOf } from '../../../../core/types';

export type LoginFormValue = {
  login: string;
  password: string;
};

export type LoginForm = ControlsOf<LoginFormValue>;
