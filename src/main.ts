import { bootstrapApplication } from '@angular/platform-browser';
import { AppComponent } from './app/app.component';
import { registerables } from 'chart.js';
import Chart from 'chart.js/auto';
import 'chartjs-adapter-date-fns';
import { importProvidersFrom } from '@angular/core';
import { provideAnimations } from '@angular/platform-browser/animations';
import { provideToastr, ToastrModule } from 'ngx-toastr';

Chart.register(...registerables);

bootstrapApplication(AppComponent, {
  providers: [
    provideAnimations(),
    provideToastr(),
    importProvidersFrom(ToastrModule.forRoot()),
  ],
}).catch(console.error);
