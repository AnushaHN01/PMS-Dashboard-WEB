import { Component, Input, OnChanges } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ChartModule } from 'primeng/chart';

import { ChartType } from '../../models/enums';

@Component({
  selector: 'chart-widget',
  standalone: true,
  imports: [CommonModule, ChartModule],
  templateUrl: './chart-widget.component.html',
  styleUrls: ['./chart-widget.component.scss'],
})
export class ChartWidgetComponent {
  @Input() chartData: any;
  @Input() chartType: ChartType = ChartType.Bar;
  @Input() chartOptions: any;
}
