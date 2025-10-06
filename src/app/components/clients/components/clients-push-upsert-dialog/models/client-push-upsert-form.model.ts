import { ControlsOf } from '../../../../../../core/types';
import { PushMessage } from '../../../../../api/push-message';

export type ClientPushFormValue = Omit<PushMessage, 'id'>;

export type ClientPushForm = ControlsOf<ClientPushFormValue, 'userId' | 'dateStart'>;
