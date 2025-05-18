import { Component, OnDestroy, OnInit } from '@angular/core';

import { LoggerService } from './main/core/services/logger.service';
import { RouterModule } from '@angular/router';
import { LayoutComponent } from './main/layout/layout/layout.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterModule, LayoutComponent],
  templateUrl: './app.component.html',
})
export class AppComponent implements OnInit, OnDestroy {
  Admin = 'Admin';

  constructor(private readonly loggerService: LoggerService) {}

  ngOnInit(): void {
    localStorage.setItem('auth_token', 'utkhsjh9080g');
    localStorage.setItem('isAdmin', 'true');
    this.loggerService.info(
      `User ${this.Admin} has logged in to MySite360 user interface`
    );
  }

  ngOnDestroy(): void {
    localStorage.removeItem('isAdmin');
    this.loggerService.info('Local storage variable isAdmin has been removed!');
  }
}
