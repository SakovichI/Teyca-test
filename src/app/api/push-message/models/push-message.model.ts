import { Nullable } from '../../../../core/types';
import { TransformDate } from '../../../../core/decorators';

export class PushMessage {
  @TransformDate()
  dateStart: Nullable<Date>;

  id: number;
  userId: string;
  pushMessage: string;
}
