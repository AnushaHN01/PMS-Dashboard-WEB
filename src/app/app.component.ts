import {
  ChangeDetectionStrategy,
  Component,
  OnDestroy,
  OnInit,
} from '@angular/core';

import { LoggerService } from './main/core/services/logger.service';
import { RouterModule } from '@angular/router';
import { LayoutComponent } from './main/layout/components/layout/layout.component';
import { LocalStorageKey } from './main/core/models/enums';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterModule, LayoutComponent],
  templateUrl: './app.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AppComponent implements OnInit, OnDestroy {
  Admin = 'Admin';

  constructor(private readonly loggerService: LoggerService) {}

  ngOnInit(): void {
    localStorage.setItem(LocalStorageKey.AuthToken, 'utkhsjh9080g');
    localStorage.setItem(LocalStorageKey.IsAdmin, 'true');
    this.loggerService.info(
      `User ${this.Admin} has logged in to user interface`
    );
  }

  ngOnDestroy(): void {
    localStorage.removeItem(LocalStorageKey.IsAdmin);
    localStorage.removeItem(LocalStorageKey.AuthToken);
    localStorage.removeItem(LocalStorageKey.WidgetVisibility);
    localStorage.clear();
    this.loggerService.info('Storage cleared on unload');
  }
}
