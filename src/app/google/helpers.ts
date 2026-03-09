import { required, schema } from '@angular/forms/signals';
import { GoogleCalendarEventInsertResource } from './types/google/calendar';

export * from './helpers/encryption';

export interface CalendarEventInsertModel extends Omit<
  GoogleCalendarEventInsertResource,
  'start' | 'end'
> {
  readonly summary: string;
  readonly description: string;
  readonly allDay: boolean;
  readonly start: string;
  readonly end: string;
}

export function toCalendarEventnsertModel(): CalendarEventInsertModel {
  return {
    summary: '',
    description: '',
    allDay: true,
    start: '',
    end: '',
  };
}

export function toGoogleCalendarEventInsertResource(
  model: CalendarEventInsertModel,
): GoogleCalendarEventInsertResource {
  const { allDay, start, end, ...rest } = model;

  return {
    ...rest,
    ...(allDay
      ? {
          start: { date: start },
          end: { date: start },
        }
      : {
          start: { dateTime: new Date(start).toISOString() },
          end: { dateTime: new Date(end).toISOString() },
        }),
  };
}
export const CalendarEventInsertSchema = schema<CalendarEventInsertModel>((path) => {
  required(path.summary);
  required(path.allDay);
  required(path.start);
  required(path.end);
});
