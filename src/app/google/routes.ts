import { Routes } from '@angular/router';
import { AuthorizationPage } from './pages/authorization-page/authorization-page';
import { GoogleRoot } from './pages/google-root/google-root';
import { OAUTH_CONFIGURATION } from './types/services';
import { googleOauthConfig } from './config';
import { OauthClient } from './services/oauth.client';
import { EventsListPage } from './pages/events-list-page/events-list-page';
import { EventsInsertPage } from './pages/events-insert-page/events-insert-page';
import { CalendarService } from './services/calendar.service';

export default [
  {
    path: '',
    providers: [
      {
        provide: OAUTH_CONFIGURATION,
        useValue: googleOauthConfig,
      },
      OauthClient,
      CalendarService, // DI
    ], // module services will be added here / ใส่เป็นobjectหรือclass ก็ได้
    children: [
      { path: 'authorization', component: AuthorizationPage },
      {
        path: '',
        component: GoogleRoot,
        children: [
          { path: '', redirectTo: 'events', pathMatch: 'full' },
          {
            path: 'events',
            children: [
              { path: '', component: EventsListPage },
              { path: 'insert', component: EventsInsertPage },
            ],
          },
        ],
      },
    ],
  },
] as Routes;
