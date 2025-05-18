import { bootstrapApplication } from '@angular/platform-browser';
import { AppComponent } from './app/app.component';
import { registerables } from 'chart.js';
import Chart from 'chart.js/auto';
import 'chartjs-adapter-date-fns';
import { importProvidersFrom } from '@angular/core';
import { provideAnimations } from '@angular/platform-browser/animations';
import { AuthInterceptor } from './app/main/core/interceptors/auth.interceptor';
import {
  provideHttpClient,
  withInterceptorsFromDi,
} from '@angular/common/http';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { provideToastr, ToastrModule } from 'ngx-toastr';
import { LoggerModule, NgxLoggerLevel } from 'ngx-logger';
import { provideRouter, Routes } from '@angular/router';

Chart.register(...registerables);

const routes: Routes = [];

bootstrapApplication(AppComponent, {
  providers: [
    provideAnimations(),
    provideToastr(),
    provideRouter(routes),
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
