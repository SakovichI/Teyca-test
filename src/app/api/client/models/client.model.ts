import { Type } from 'class-transformer';

export class Client {
  @Type(() => Date) createdAt: Date;

  userId: number;
  oS: string;
  template: string;
  fio: string;
  firstName: string;
  lastName: string;
  pathName: string;
  phone: string;
  smsVerify: boolean;
  email: string;
  birthday: string;
  gender: string;
  carNumber: string;
  discount: string;
  bonus: string;
  bonusLast: string;
  writeOffLast: string;
  loyaltyLevel: string;
  summ: string;
  summAll: string;
  summLast: string;
  visit: string;
  visitsAll: string;
  dateLast: string;
  barcode: string;
  city: string;
  confirmCode: string;
  link: string;
}
