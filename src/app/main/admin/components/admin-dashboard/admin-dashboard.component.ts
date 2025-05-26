import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { NgIf } from '@angular/common';
import { DropdownModule } from 'primeng/dropdown';

import { ChartType } from '../../../shared/models/enums';
import {
  ToastrMessageType,
  ToastrMessageWrapperService,
} from '../../../shared/services/toastr-message-wrapper.service';
import { WidgetType } from '../../models/enums';
import { LocalStorageKey } from '../../../core/models/enums';
import { ChartDataService } from '../../services/chartdata.service';
import { GenericChartWidgetComponent } from '../../../shared/components/generic-chart-widget/generic-chart-widget.component';
import { DropdownModel } from '../../../layout/models/dropdown.model';
import { CanComponentDeactivate } from '../../../shared/guard/guards/unsaved-changes.guard';

@Component({
  selector: 'admin-dashboard',
  standalone: true,
  imports: [NgIf, DropdownModule, GenericChartWidgetComponent],
  templateUrl: './admin-dashboard.component.html',
  styleUrls: ['./admin-dashboard.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AdminDashboardComponent implements OnInit {
  showOccupancyChartWidget = false;
  showCheckInChartWidget = false;
  showTimeSeriesWidget = false;
  isRemoveBtnEnable = false;
  ChartType = ChartType;
  occupancyData: any;
  checkInData: any;
  dailyCheckInData: any;
  selectedWidgetType = '';
  WidgetType: typeof WidgetType = WidgetType;
  widgetTypeOptions: DropdownModel[] = [];

  constructor(
    private readonly toastr: ToastrMessageWrapperService,
    private readonly chartDataService: ChartDataService
  ) {
    if (localStorage.getItem(LocalStorageKey.IsAdmin)) {
      this.isRemoveBtnEnable = true;
    }
  }

  ngOnInit(): void {
    this.widgetTypeOptions = this.chartDataService.getWidgetTypeList();
    this.loadSavedDashboard();
  }

  addWidget(): void {
    if (this.selectedWidgetType === WidgetType.Occupancy) {
      this.loadOccupancyChartData();
    } else if (this.selectedWidgetType === WidgetType.CheckIn) {
      this.loadCheckInChartData();
    } else if (this.selectedWidgetType === WidgetType.DailyCheckIn) {
      this.loadDailyChartData();
    }
  }

  removeWidget(val: WidgetType): void {
    if (val === WidgetType.Occupancy) {
      this.showOccupancyChartWidget = false;
    } else if (val === WidgetType.CheckIn) {
      this.showCheckInChartWidget = false;
    } else if (val === WidgetType.DailyCheckIn) {
      this.showTimeSeriesWidget = false;
    }
  }

  onTypeDropdownChange(type: string): void {
    console.log(type);
    this.selectedWidgetType = type;
  }

  saveLayout(): void {
    const widgetVisibility = {
      showOccupancyChartWidget: this.showOccupancyChartWidget,
      showCheckInChartWidget: this.showCheckInChartWidget,
      showTimeSeriesWidget: this.showTimeSeriesWidget,
    };

    localStorage.setItem(
      LocalStorageKey.WidgetVisibility,
      JSON.stringify(widgetVisibility)
    );
    this.toastr.displayMessage(
      'Layout saved successfully!',
      ToastrMessageType.SUCCESS
    );
  }

  private loadOccupancyChartData(): void {
    this.showOccupancyChartWidget = true;
    this.occupancyData = this.chartDataService.getOccupancyChartData();
    this.toastr.displayMessage(
      'Room Occupancy loaded successfully!',
      ToastrMessageType.SUCCESS
    );
  }

  private loadCheckInChartData(): void {
    this.showCheckInChartWidget = true;
    this.checkInData = this.chartDataService.getCheckInChartData();
    this.toastr.displayMessage(
      'Check-in count loaded successfully!',
      ToastrMessageType.SUCCESS
    );
  }

  private loadDailyChartData(): void {
    this.showTimeSeriesWidget = true;
    this.dailyCheckInData = this.chartDataService.getTimeSeriesChartData();
    this.toastr.displayMessage(
      'Time series loaded successfully!',
      ToastrMessageType.SUCCESS
    );
  }

  private loadSavedDashboard(): void {
    const widgetData = localStorage.getItem(LocalStorageKey.WidgetVisibility);
    if (widgetData) {
      const widgetVisibility = JSON.parse(widgetData);
      if (widgetVisibility?.showOccupancyChartWidget) {
        this.loadOccupancyChartData();
      }

      if (widgetVisibility?.showCheckInChartWidget) {
        this.loadCheckInChartData();
      }

      if (widgetVisibility?.showTimeSeriesWidget) {
        this.loadDailyChartData();
      }
    }
  }
}
