import { bootstrapApplication } from '@angular/platform-browser';
import { registerables } from 'chart.js';
import Chart from 'chart.js/auto';
import 'chartjs-adapter-date-fns';
import { importProvidersFrom } from '@angular/core';
import { provideAnimations } from '@angular/platform-browser/animations';
import {
  provideHttpClient,
  withInterceptorsFromDi,
} from '@angular/common/http';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { provideToastr, ToastrModule } from 'ngx-toastr';
import { LoggerModule, NgxLoggerLevel } from 'ngx-logger';
import { provideRouter, Routes } from '@angular/router';

import { AppComponent } from './app/app.component';
import { AuthInterceptor } from './app/main/core/interceptors/auth.interceptor';
import { routes } from './app/app.routes';
import { UnsavedChangesGuard } from './app/main/shared/guard/guards/unsaved-changes.guard';

Chart.register(...registerables);

bootstrapApplication(AppComponent, {
  providers: [
    provideAnimations(),
    provideToastr(),
    provideRouter(routes),
    UnsavedChangesGuard,
    importProvidersFrom(ToastrModule.forRoot()),
    provideHttpClient(withInterceptorsFromDi()),
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true,
    },
    importProvidersFrom(
      LoggerModule.forRoot({
        level: NgxLoggerLevel.DEBUG,
        serverLogLevel: NgxLoggerLevel.ERROR,
      }),
      ToastrModule.forRoot()
    ),
  ],
}).catch(console.error);
