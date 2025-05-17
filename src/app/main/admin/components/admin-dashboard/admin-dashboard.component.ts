import { Component, OnInit } from '@angular/core';
import { addDays, formatISO } from 'date-fns';
import { NgFor, NgIf } from '@angular/common';

import { ChartWidgetComponent } from '../../../shared/components/chart-widget/chart-widget.component';
import { ChartType } from '../../../shared/models/enums';
import { DashboardService } from '../../services/dashboard.service';
import { DashboardMetric } from '../../models/dashboard.service';
import { Booking } from '../../models/booking.model';
import { AdminSection } from '../../models/enums';
import { ChartDataService } from '../../services/chartdata.service';
import { LocalStorageService } from '../../../shared/services/localstorage.service';
import {
  ToastrMessageType,
  ToastrMessageWrapperService,
} from '../../../shared/services/toastr-message-wrapper.service';

@Component({
  selector: 'admin-dashboard',
  standalone: true,
  imports: [NgIf, NgFor, ChartWidgetComponent],
  templateUrl: './admin-dashboard.component.html',
  styleUrls: ['./admin-dashboard.component.scss'],
})
export class AdminDashboardComponent implements OnInit {
  adminSections = Object.values(AdminSection);
  metrics: DashboardMetric[] = [];
  showChartWidget = false;
  bookingDetails: Booking[] = [];
  chartData: any;
  chartType: ChartType = ChartType.Bar;
  isRemoveBtnEnable = false;

  get chartOptions(): any {
    return {
      responsive: true,
      plugins: {
        legend: { position: 'top' },
        title: { display: true, text: 'Chart Widget' },
      },
      scales: {
        x: {
          type: this.chartType === 'line' ? 'time' : 'category',
          title: { display: true, text: 'Category / Date' },
        },
        y: {
          beginAtZero: true,
          title: { display: true, text: 'Count' },
        },
      },
    };
  }

  constructor(
    private chartDataService: ChartDataService,
    private dashboardService: DashboardService,
    private localStorage: LocalStorageService,
    private readonly toastr: ToastrMessageWrapperService
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

  AddWidget(type: string): void {
    this.showChartWidget = true;
    if (type == 'Chart') {
      this.chartType = ChartType.Bar;
      this.loadBarChart();
    } else if (type == 'Time') {
      this.chartType = ChartType.Line;
      this.loadTimeSeries();
    }
  }

  removeWidget(): void {
    this.showChartWidget = false;
    this.chartData = null;
    this.toastr.displayMessage(
      'Widget Removed successfully!',
      ToastrMessageType.SUCCESS
    );
  }

  private loadBarChart(): void {
    this.chartData = this.chartDataService.getBarChartData();
    this.toastr.displayMessage(
      'Bar chart loaded successfully!',
      ToastrMessageType.SUCCESS
    );
  }

  private loadTimeSeries(): void {
    this.chartData = this.chartDataService.getTimeSeriesChartData();
    this.toastr.displayMessage(
      'Time series loaded successfully!',
      ToastrMessageType.SUCCESS
    );
  }
}
