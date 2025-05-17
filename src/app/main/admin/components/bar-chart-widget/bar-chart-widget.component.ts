import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { NgIf } from '@angular/common';
import { DropdownModule } from 'primeng/dropdown';

import { ChartType } from '../../../shared/models/enums';
import { ChartDataService } from '../../services/chartdata.service';
import {
  ToastrMessageType,
  ToastrMessageWrapperService,
} from '../../../shared/services/toastr-message-wrapper.service';
import { ChartWidgetComponent } from '../../../shared/components/chart-widget/chart-widget.component';
import { RoomTypeKPI } from '../../models/enums';

@Component({
  selector: 'bar-chart-widget',
  standalone: true,
  imports: [NgIf, ChartWidgetComponent, DropdownModule],
  templateUrl: './bar-chart-widget.component.html',
  styleUrls: ['./bar-chart-widget.component.scss'],
})
export class BarChartWidgetComponent implements OnInit {
  @Input() isRemoveBtnEnable = false;
  @Output() showChartWidget = new EventEmitter<boolean>();
  chartData: any;
  chartType: ChartType = ChartType.Bar;
  selectedRoom: any;
  roomTypes = Object.values(RoomTypeKPI).map((value) => ({
    label: value,
    value,
  }));

  get chartOptions(): any {
    return {
      responsive: false,
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
    this.chartType = ChartType.Bar;
    this.loadOccupancyChart();
  }

  removeWidget(): void {
    this.showChartWidget.emit(false);
    this.chartData = null;
    this.toastr.displayMessage(
      'Widget Removed successfully!',
      ToastrMessageType.SUCCESS
    );
  }

  onTypeDropdownChange(val: string): void {
    if (val == 'Check-in') {
      this.loadCheckInsChart();
    } else {
      this.loadOccupancyChart();
    }
  }

  private loadOccupancyChart(): void {
    this.chartData = this.chartDataService.getOccupancyChartData();
    this.toastr.displayMessage(
      'Room types by occupancy loaded successfully!',
      ToastrMessageType.SUCCESS
    );
  }

  private loadCheckInsChart(): void {
    this.chartData = this.chartDataService.getCheckInChartData();
    this.toastr.displayMessage(
      'Check-in count by weekday loaded successfully!',
      ToastrMessageType.SUCCESS
    );
  }
}
