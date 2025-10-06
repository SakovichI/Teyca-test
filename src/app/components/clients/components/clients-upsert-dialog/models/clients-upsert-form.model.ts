import { ControlsOf } from '../../../../../../core/types';
import { Client } from '../../../../../api';

export type ClientUpsertFormValue = Pick<
  Client,
  'firstName' | 'lastName' | 'template' | 'city' | 'gender' | 'email' | 'phone'
>;

export type ClientUpsertForm = ControlsOf<ClientUpsertFormValue>;
