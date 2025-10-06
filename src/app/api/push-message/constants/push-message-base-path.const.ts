import { environment } from '../../../../environments';

export const PUSH_MESSAGE_BASE_PATH = (token: string): string =>
  `${environment.devUrl}/v1/${token}/message/push`;
