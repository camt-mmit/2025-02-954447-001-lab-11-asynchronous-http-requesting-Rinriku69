import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { GoogleCalendarEvent } from '../../types/google/calendar';
import { RouterLinkActive } from "@angular/router";

@Component({
  selector: 'app-events-list',
  imports: [RouterLinkActive],
  templateUrl: './events-list.html',
  styleUrl: './events-list.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class EventsList {
  readonly items = input.required<readonly GoogleCalendarEvent[]>();
}
