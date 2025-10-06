import { AuthConfig } from 'angular-oauth2-oidc';

export const AUTH_CONFIG: AuthConfig = {
  strictDiscoveryDocumentValidation: false,
  responseType: 'code',
  // Установите область действия для разрешений, которые должен запросить клиент
  // Первые четыре определены OIDC.
  // Важно запросить offline_access, чтобы получить токен обновления
  // 'api' зависит от конкретного случая использования
  scope: 'openid email profile offline_access login',
  requireHttps: false,
  requestAccessToken: true,
};
