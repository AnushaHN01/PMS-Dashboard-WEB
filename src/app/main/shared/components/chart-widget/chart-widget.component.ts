import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ChartModule } from 'primeng/chart';
import { ChartType } from '../../models/enums';

@Component({
  selector: 'chart-widget',
  standalone: true,
  imports: [CommonModule, ChartModule],
  template: `
    <p-chart
      *ngIf="chartData"
      [type]="chartType"
      [data]="chartData"
      [options]="chartOptions"
    ></p-chart>
  `,
})
export class ChartWidgetComponent {
  @Input() chartData: any;
  @Input() chartType: ChartType = ChartType.Bar;
  @Input() chartOptions: any;
}
