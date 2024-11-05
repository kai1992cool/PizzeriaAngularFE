import {APP_INITIALIZER, ApplicationConfig, inject, provideZoneChangeDetection} from '@angular/core';
import {provideRouter} from '@angular/router';

import {routes} from './app.routes';
import {provideClientHydration} from '@angular/platform-browser';
import {provideHttpClient, withFetch} from '@angular/common/http';
import {SsrCookieService} from 'ngx-cookie-service-ssr';
import {AuthService} from '../../services/auth/auth.service';

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({eventCoalescing: true}),
    provideRouter(routes),
    provideClientHydration(),
    provideHttpClient(withFetch()),
    {
      provide: APP_INITIALIZER,
      useFactory: () => {
        const cookieService = inject(SsrCookieService);
        const authService = inject(AuthService);

        return () => new Promise((resolve) => {
          const isAuthenticated = cookieService.check("idToken");
          console.log(isAuthenticated);

          if (isAuthenticated) {
            const idToken = cookieService.get("idToken");
            authService.setUserCredentials(idToken);
            console.log(authService.getIsAuthenticated());

          }

          resolve(true);
        });
      },
      multi: true,
    }
  ]
};
