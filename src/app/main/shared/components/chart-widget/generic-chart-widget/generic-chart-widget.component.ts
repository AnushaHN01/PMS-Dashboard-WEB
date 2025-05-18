import { Component, EventEmitter, Input, Output } from '@angular/core';
import { NgIf } from '@angular/common';
import { DropdownModule } from 'primeng/dropdown';

import { ChartWidgetComponent } from '../chart-widget.component';
import {
  ToastrMessageType,
  ToastrMessageWrapperService,
} from '../../../services/toastr-message-wrapper.service';
import { ChartType } from '../../../models/enums';
import { LocalStorageKey } from '../../../../core/models/enums';

@Component({
  selector: 'generic-chart-widget',
  standalone: true,
  imports: [NgIf, DropdownModule, ChartWidgetComponent],
  templateUrl: './generic-chart-widget.component.html',
  styleUrls: ['./generic-chart-widget.component.scss'],
})
export class GenericChartWidgetComponent {
  @Input() chartType: ChartType = ChartType.Bar;
  @Input() widgetTitle = 'Chart';
  @Input() chartData: any;
  isRemoveBtnEnable = false;

  @Output() remove = new EventEmitter<void>();

  get chartOptions(): any {
    return {
      responsive: true,
      plugins: {
        legend: { position: 'top' },
        title: { display: true, text: this.widgetTitle },
      },
      scales: {
        x: {
          type: this.chartType === ChartType.Line ? 'time' : 'category',
          title: { display: true, text: 'Category' },
        },
        y: {
          beginAtZero: true,
          title: { display: true, text: 'Count' },
        },
      },
    };
  }

  constructor(private toastr: ToastrMessageWrapperService) {
    if (localStorage.getItem(LocalStorageKey.IsAdmin)) {
      this.isRemoveBtnEnable = true;
    }
  }

  removeWidget(): void {
    this.remove.emit();
    this.chartData = null;
    this.toastr.displayMessage(
      'Widget removed successfully!',
      ToastrMessageType.SUCCESS
    );
  }
}
