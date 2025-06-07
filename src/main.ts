import { bootstrapApplication } from '@angular/platform-browser';
import { importProvidersFrom } from '@angular/core';
import { provideAnimations } from '@angular/platform-browser/animations';
import {
  provideHttpClient,
  withInterceptorsFromDi,
  HTTP_INTERCEPTORS,
} from '@angular/common/http';
import { provideRouter } from '@angular/router';
import { provideToastr } from 'ngx-toastr';
import { LoggerModule, NgxLoggerLevel } from 'ngx-logger';
import { NgxsModule } from '@ngxs/store';
import { provideStore } from '@ngrx/store';

import { AppComponent } from './app/app.component';
import { routes } from './app/app.routes';
import { LayoutState } from './app/main/admin/state/dashboard/dashboard.state';
import { ChartDataState } from './app/main/admin/state/chartdata/chartdata.state';
import { ProductState } from './app/main/product/state/product.state';
import { employeeReducer } from './app/main/usermanagement/state/employee.reducer';
import { AuthInterceptor } from './app/main/core/interceptors/auth.interceptor';
import { UnsavedChangesGuard } from './app/main/shared/guard/guards/unsaved-changes.guard';

bootstrapApplication(AppComponent, {
  providers: [
    provideAnimations(),
    provideToastr(),
    provideRouter(routes),

    //NgRx must come FIRST
    provideStore({ employee: employeeReducer }),
    //NgRx Effects
    //provideEffects([EmployeeEffects]),

    //NgXS should come AFTER NgRx
    importProvidersFrom(
      //EffectsModule.forRoot([EmployeeEffects]),
      NgxsModule.forRoot([LayoutState, ChartDataState, ProductState]),
      LoggerModule.forRoot({
        level: NgxLoggerLevel.DEBUG,
        serverLogLevel: NgxLoggerLevel.ERROR,
      })
    ),

    provideHttpClient(withInterceptorsFromDi()),
    UnsavedChangesGuard,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true,
    },
  ],
}).catch(console.error);
