import { ChangeDetectionStrategy, Component, inject, input, linkedSignal } from '@angular/core';
import { CalendarService } from '../../services/calendar.service';
import { GoogleCalendarEventsListRequest } from '../../types/google/calendar';
import { form, FormField } from '@angular/forms/signals';

const defaulQueryParams: GoogleCalendarEventsListRequest = {
  calendarId: 'primary',
  maxResults: 25,
  singleEvents: true,
  eventTypes: ['default'],
  orderBy: 'startTime',
};
@Component({
  selector: 'app-events-list-page',
  imports: [FormField],
  templateUrl: './events-list-page.html',
  styleUrl: './events-list-page.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class EventsListPage {
  private readonly service = inject(CalendarService);

  readonly q = input<string>();

  private readonly params = linkedSignal(() => ({
    ...defaulQueryParams,
    ...(this.q() ? { q: this.q()! } : {}),
  }));

  protected readonly resource = this.service.eventResource(this.params);

  protected readonly form = form(
    linkedSignal(
      () =>
        ({
          q: this.q() ?? '',
        }) as const,
    ),
  );
}
