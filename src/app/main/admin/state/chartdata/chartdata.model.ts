import { DropdownModel } from '../../../layout/models/dropdown.model';

export interface ChartDataStateModel {
  widgetType: DropdownModel[];
  occupancyChart: any;
  checkInChart: any;
  timeSeriesChart: any;
}
