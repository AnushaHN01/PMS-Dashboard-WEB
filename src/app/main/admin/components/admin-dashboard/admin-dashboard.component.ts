import { Component, OnInit } from '@angular/core';
import { NgFor, NgIf } from '@angular/common';

import { DashboardService } from '../../services/dashboard.service';
import { DashboardMetric } from '../../models/dashboard.service';
import { AdminSection } from '../../models/enums';
import { LocalStorageService } from '../../../shared/services/localstorage.service';
import { BarChartWidgetComponent } from '../bar-chart-widget/bar-chart-widget.component';
import { TimeSeriesChartWidgetComponent } from '../time-series-chart-widget/time-series-chart-widget.component';

@Component({
  selector: 'admin-dashboard',
  standalone: true,
  imports: [
    NgIf,
    NgFor,
    BarChartWidgetComponent,
    TimeSeriesChartWidgetComponent,
  ],
  templateUrl: './admin-dashboard.component.html',
  styleUrls: ['./admin-dashboard.component.scss'],
})
export class AdminDashboardComponent implements OnInit {
  adminSections = Object.values(AdminSection);
  metrics: DashboardMetric[] = [];
  showBarChartWidget = false;
  showTimeSeriesWidget = false;
  isRemoveBtnEnable = false;

  constructor(
    private dashboardService: DashboardService,
    private localStorage: LocalStorageService
  ) {
    if (this.localStorage.getItem('isAdmin')) {
      this.isRemoveBtnEnable = true;
    }
  }

  ngOnInit(): void {
    this.dashboardService.getMetrics().subscribe((data) => {
      this.metrics = data;
    });
  }

  addWidget(type: string): void {
    if (type == 'Chart') {
      this.showBarChartWidget = true;
      this.showTimeSeriesWidget = false;
    } else if (type == 'Time') {
      this.showBarChartWidget = false;
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
}
