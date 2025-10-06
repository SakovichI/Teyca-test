import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { PushMessage, PushMessageResponse } from '../../models';
import { PUSH_MESSAGE_BASE_PATH } from '../../constants';
import { AuthService } from '../../../../../auth/services';
import { mapInstanceToPlain } from '../../../../../core/helpers';

@Injectable()
export class PushMessageApiService {
  readonly #http = inject(HttpClient);
  readonly #authService = inject(AuthService);

  sendPushMessage(data: Partial<PushMessage>): Observable<PushMessageResponse> {
    const transformedMessage = mapInstanceToPlain(PushMessage, data);

    return this.#http.post<PushMessageResponse>(
      `${PUSH_MESSAGE_BASE_PATH(this.#authService.accessToken)}`,
      transformedMessage
    );
  }
}
