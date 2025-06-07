import {
  ChangeDetectionStrategy,
  Component,
  inject,
  OnInit,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { DropdownModule } from 'primeng/dropdown';
import { Store } from '@ngxs/store';
import { Observable } from 'rxjs';
import { FormsModule } from '@angular/forms';

import { ChartType } from '../../../shared/models/enums';
import {
  ToastrMessageType,
  ToastrMessageWrapperService,
} from '../../../shared/services/toastr-message-wrapper.service';
import { WidgetType } from '../../models/enums';
import { LocalStorageKey } from '../../../core/models/enums';
import { GenericChartWidgetComponent } from '../../../shared/components/generic-chart-widget/generic-chart-widget.component';
import { DropdownModel } from '../../../layout/models/dropdown.model';
import { ChartDataState } from '../../state/chartdata/chartdata.state';
import {
  LoadCheckInChart,
  LoadOccupancyChart,
  LoadTimeSeriesChart,
  LoadWidgetType,
} from '../../state/chartdata/chartdata.actions';

@Component({
  selector: 'admin-dashboard',
  standalone: true,
  imports: [
    FormsModule,
    CommonModule,
    DropdownModule,
    GenericChartWidgetComponent,
  ],
  templateUrl: './admin-dashboard.component.html',
  styleUrls: ['./admin-dashboard.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AdminDashboardComponent implements OnInit {
  private store = inject(Store);
  private toastr = inject(ToastrMessageWrapperService);

  ChartType = ChartType;
  WidgetType = WidgetType;
  selectedWidgetType!: WidgetType;

  widgetTypes$ = this.store.select(ChartDataState.widgetType);
  occupancyData$ = this.store.select(ChartDataState.occupancyChart);
  checkInData$ = this.store.select(ChartDataState.checkInChart);
  dailyCheckInData$ = this.store.select(ChartDataState.timeSeriesChart);

  widgetVisibility: Record<WidgetType, boolean> = {
    [WidgetType.Occupancy]: false,
    [WidgetType.CheckIn]: false,
    [WidgetType.DailyCheckIn]: false,
  };

  isRemoveBtnEnable = !!localStorage.getItem(LocalStorageKey.IsAdmin);

  ngOnInit(): void {
    this.store.dispatch(new LoadWidgetType());
    this.loadSavedDashboard();
  }

  addWidget(): void {
    this.toggleWidgetVisibility(this.selectedWidgetType, true);
  }

  removeWidget(type: WidgetType): void {
    this.toggleWidgetVisibility(type, false);
  }

  onTypeDropdownChange(type: WidgetType): void {
    this.selectedWidgetType = type;
  }

  saveLayout(): void {
    localStorage.setItem(
      LocalStorageKey.WidgetVisibility,
      JSON.stringify(this.widgetVisibility)
    );
    this.toastr.displayMessage(
      'Layout saved successfully!',
      ToastrMessageType.SUCCESS
    );
  }

  private loadChartData(action: any, message: string, type: WidgetType): void {
    this.widgetVisibility[type] = true;
    this.store.dispatch(new action());
    this.toastr.displayMessage(message, ToastrMessageType.SUCCESS);
  }

  private toggleWidgetVisibility(type: WidgetType, isVisible: boolean): void {
    this.widgetVisibility[type] = isVisible;
    if (isVisible) {
      const actions: Record<WidgetType, any> = {
        [WidgetType.Occupancy]: LoadOccupancyChart,
        [WidgetType.CheckIn]: LoadCheckInChart,
        [WidgetType.DailyCheckIn]: LoadTimeSeriesChart,
      };
      this.loadChartData(
        actions[type],
        `${this.getWidgetTitle(type)} Loaded Successfully!`,
        type
      );
    }
  }

  private loadSavedDashboard(): void {
    const storedVisibility = localStorage.getItem(
      LocalStorageKey.WidgetVisibility
    );
    if (storedVisibility) {
      this.widgetVisibility = JSON.parse(storedVisibility);
      Object.entries(this.widgetVisibility).forEach(([key, visible]) => {
        if (visible) {
          this.toggleWidgetVisibility(key as WidgetType, true);
        }
      });
    }
  }

  getChartData(type: WidgetType): Observable<any> {
    return {
      [WidgetType.Occupancy]: this.occupancyData$,
      [WidgetType.CheckIn]: this.checkInData$,
      [WidgetType.DailyCheckIn]: this.dailyCheckInData$,
    }[type]!;
  }

  getChartType(type: WidgetType): ChartType {
    return {
      [WidgetType.Occupancy]: ChartType.Bar,
      [WidgetType.CheckIn]: ChartType.Bar,
      [WidgetType.DailyCheckIn]: ChartType.Line,
    }[type]!;
  }

  getWidgetTitle(type: WidgetType): string {
    return {
      [WidgetType.Occupancy]: 'Top 5 Room Types by Occupancy',
      [WidgetType.CheckIn]: 'Check-in Count by Weekday',
      [WidgetType.DailyCheckIn]: 'Daily Check-ins over 14 Days',
    }[type]!;
  }
}
