import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  input,
  Input,
  Output,
  signal,
} from '@angular/core';
import { NgIf } from '@angular/common';
import { DropdownModule } from 'primeng/dropdown';
import { ChartWidgetComponent } from '../chart-widget/chart-widget.component';
import { ChartType } from '../../models/enums';
import {
  ToastrMessageType,
  ToastrMessageWrapperService,
} from '../../services/toastr-message-wrapper.service';
import { LocalStorageKey } from '../../../core/models/enums';

@Component({
  selector: 'generic-chart-widget',
  standalone: true,
  imports: [NgIf, DropdownModule, ChartWidgetComponent],
  templateUrl: './generic-chart-widget.component.html',
  styleUrls: ['./generic-chart-widget.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class GenericChartWidgetComponent {
  chartType = input<ChartType>(ChartType.Bar);
  @Input() widgetTitle = 'Chart';
  @Input() chartData: any;
  isRemoveBtnEnable = signal<boolean>(false);

  @Output() remove = new EventEmitter<void>();

  chartOptions = signal<any>({
    responsive: true,
    plugins: {
      legend: { position: 'top' },
      title: { display: true, text: this.widgetTitle },
    },
    scales: {
      x: {
        type: this.chartType() === ChartType.Line ? 'time' : 'category',
        title: { display: true, text: 'Category' },
      },
      y: {
        beginAtZero: true,
        title: { display: true, text: 'Count' },
      },
    },
  });

  constructor(private toastr: ToastrMessageWrapperService) {
    this.isRemoveBtnEnable.set(
      localStorage.getItem(LocalStorageKey.IsAdmin) === 'true'
    );
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
