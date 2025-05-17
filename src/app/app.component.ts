import { Component, OnDestroy, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { AdminDashboardComponent } from './main/admin/components/admin-dashboard/admin-dashboard.component';
import { LocalStorageService } from './main/shared/services/localstorage.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [AdminDashboardComponent],
  templateUrl: './app.component.html',
})
export class AppComponent implements OnInit, OnDestroy {
  constructor(private localStorage: LocalStorageService) {}
  ngOnInit(): void {
    this.localStorage.setItem('isAdmin', true);
  }

  ngOnDestroy(): void {
    this.localStorage.removeItem('isAdmin');
  }
}
