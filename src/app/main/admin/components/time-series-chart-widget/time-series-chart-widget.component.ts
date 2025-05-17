import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ChartWidgetComponent } from '../../../shared/components/chart-widget/chart-widget.component';
import { ChartType } from '../../../shared/models/enums';
import {
  ToastrMessageType,
  ToastrMessageWrapperService,
} from '../../../shared/services/toastr-message-wrapper.service';
import { ChartDataService } from '../../services/chartdata.service';
import { NgIf } from '@angular/common';

@Component({
  selector: 'time-series-chart-widget',
  standalone: true,
  imports: [NgIf, ChartWidgetComponent],
  templateUrl: './time-series-chart-widget.component.html',
  styleUrls: ['./time-series-chart-widget.component.scss'],
})
export class TimeSeriesChartWidgetComponent implements OnInit {
  @Input() isRemoveBtnEnable = false;
  @Output() showTimeWidget = new EventEmitter<boolean>();
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
    private readonly toastr: ToastrMessageWrapperService
  ) {}

  ngOnInit() {
    this.chartType = ChartType.Line;
    this.loadTimeSeries();
  }

  removeWidget(): void {
    this.showTimeWidget.emit(false);
    this.chartData = null;
    this.toastr.displayMessage(
      'Widget Removed successfully!',
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
