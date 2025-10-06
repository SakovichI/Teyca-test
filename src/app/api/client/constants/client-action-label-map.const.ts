import { ClientActionType } from '../enums';

export const CLIENT_ACTION_LABEL_MAP: Record<ClientActionType, string> = {
  [ClientActionType.Add]: 'Добавить',
  [ClientActionType.SendPush]: 'Отправить Push',
  [ClientActionType.Edit]: 'Обновить',
  [ClientActionType.Delete]: 'Удалить',
};
