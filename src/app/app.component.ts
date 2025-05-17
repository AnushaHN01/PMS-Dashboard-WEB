import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { AdminDashboardComponent } from './main/admin/components/admin-dashboard/admin-dashboard.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [AdminDashboardComponent],
  templateUrl: './app.component.html',
})
export class AppComponent {}
