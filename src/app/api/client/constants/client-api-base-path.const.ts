import { environment } from '../../../../environments';

export const CLIENT_API_BASE_PATH = (token: string): string =>
  `${environment.devUrl}/v1/${token}/passes`;
