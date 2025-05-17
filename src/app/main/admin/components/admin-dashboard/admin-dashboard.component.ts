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
    private dashboardService: DashboardService
  ) {}

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
  }

  private loadBarChart(): void {
    this.chartData = this.chartDataService.getBarChartData();
  }

  private loadTimeSeries(): void {
    this.chartData = this.chartDataService.getTimeSeriesChartData();
  }
}
