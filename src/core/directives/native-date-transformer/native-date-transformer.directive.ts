import { Directive, Injectable } from '@angular/core';
import { AbstractTuiValueTransformer, TuiDay, TuiTime } from '@taiga-ui/cdk';
import { TUI_DATE_TIME_VALUE_TRANSFORMER } from '@taiga-ui/kit';
import { Nullable } from '../../types';

@Injectable()
export class DateTimeTransformer extends AbstractTuiValueTransformer<
  [TuiDay | null, TuiTime | null],
  Date
> {
  fromControlValue(controlValue: Nullable<Date>): [TuiDay | null, TuiTime | null] {
    if (!controlValue) {
      return [null, null];
    } else {
      const day = controlValue;
      const time = controlValue.toLocaleTimeString();
      const tuiTime = time ? new TuiTime(TuiTime.fromString(time).hours + 3, 0) : new TuiTime(0, 0);

      return day ? [TuiDay.fromLocalNativeDate(day), time ? tuiTime : null] : [null, null];
    }
  }

  toControlValue([day, time]: [TuiDay | null, TuiTime | null]): Date {
    if (day) {
      const date = day.toLocalNativeDate();
      date.setHours(time?.hours ?? 0);
      date.setMinutes(time?.minutes ?? 0);

      return date;
    }

    return new Date();
  }
}

@Directive({
  selector: 'tui-input-date-time[toNativeDateTime]',
  standalone: true,
  providers: [
    {
      provide: TUI_DATE_TIME_VALUE_TRANSFORMER,
      useClass: DateTimeTransformer,
    },
  ],
})
export class NativeDateTimeTransformerDirective {}
