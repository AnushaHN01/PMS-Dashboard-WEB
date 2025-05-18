import { Component, OnDestroy, OnInit } from '@angular/core';
import { NgIf } from '@angular/common';

import { BarChartWidgetComponent } from '../bar-chart-widget/bar-chart-widget.component';
import { TimeSeriesChartWidgetComponent } from '../time-series-chart-widget/time-series-chart-widget.component';
import {
  ToastrMessageType,
  ToastrMessageWrapperService,
} from '../../../shared/services/toastr-message-wrapper.service';
import { LoggerService } from '../../../core/services/logger.service';

@Component({
  selector: 'admin-dashboard',
  standalone: true,
  imports: [NgIf, BarChartWidgetComponent, TimeSeriesChartWidgetComponent],
  templateUrl: './admin-dashboard.component.html',
  styleUrls: ['./admin-dashboard.component.scss'],
})
export class AdminDashboardComponent implements OnInit, OnDestroy {
  showBarChartWidget = false;
  showTimeSeriesWidget = false;
  isRemoveBtnEnable = false;
  configuration: any;

  constructor(
    private readonly toastr: ToastrMessageWrapperService,
    private readonly loggerService: LoggerService
  ) {
    if (localStorage.getItem('isAdmin')) {
      this.isRemoveBtnEnable = true;
    }
  }

  ngOnInit(): void {
    const saved = localStorage.getItem('widgetVisibility');
    if (saved) {
      const widgetVisibility = JSON.parse(saved);
      this.showBarChartWidget = widgetVisibility.showBarChartWidget;
      this.showTimeSeriesWidget = widgetVisibility.showTimeSeriesWidget;
    }
  }

  addWidget(type: string): void {
    if (type == 'Chart') {
      this.showBarChartWidget = true;
    } else if (type == 'Time') {
      this.showTimeSeriesWidget = true;
    }
  }

  removeWidget(type: string): void {
    if (type == 'Chart') {
      this.showBarChartWidget = false;
    } else if (type == 'Time') {
      this.showTimeSeriesWidget = false;
    }
  }

  saveLayout(): void {
    const widgetVisibility = {
      showBarChartWidget: this.showBarChartWidget,
      showTimeSeriesWidget: this.showTimeSeriesWidget,
    };
    localStorage.setItem('widgetVisibility', JSON.stringify(widgetVisibility));
    this.toastr.displayMessage(
      'Layout saved successfully!',
      ToastrMessageType.SUCCESS
    );
  }

  ngOnDestroy(): void {
    localStorage.removeItem('widgetVisibility');
    this.loggerService.info(
      'Local storage variable widgetVisibility has been removed!'
    );
  }
}
