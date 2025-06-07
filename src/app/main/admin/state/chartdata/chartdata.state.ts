import { Action, Selector, State, StateContext } from '@ngxs/store';
import { Injectable } from '@angular/core';
import { ChartDataStateModel } from './chartdata.model';
import { ChartDataService } from './../../services/chartdata.service';
import { EMPTY, tap } from 'rxjs';
import {
  LoadCheckInChart,
  LoadOccupancyChart,
  LoadTimeSeriesChart,
  LoadWidgetType,
} from './chartdata.actions';
import { DropdownModel } from '../../../layout/models/dropdown.model';

@State<ChartDataStateModel>({
  name: 'adminDashboard',
  defaults: {
    widgetType: [],
    occupancyChart: null,
    checkInChart: null,
    timeSeriesChart: null,
  },
})
@Injectable()
export class ChartDataState {
  constructor(private chartDataService: ChartDataService) {}

  @Selector()
  static widgetType(state: ChartDataStateModel): DropdownModel[] {
    return state.widgetType ?? [];
  }

  @Selector()
  static occupancyChart(state: ChartDataStateModel) {
    return state.occupancyChart;
  }

  @Selector()
  static checkInChart(state: ChartDataStateModel) {
    return state.checkInChart;
  }

  @Selector()
  static timeSeriesChart(state: ChartDataStateModel) {
    return state.timeSeriesChart;
  }

  private fetchChartData<T>(
    ctx: StateContext<ChartDataStateModel>,
    key: keyof ChartDataStateModel,
    serviceMethod: () => any
  ) {
    const state = ctx.getState();
    if (state[key] && Array.isArray(state[key]) && state[key].length > 0) {
      return EMPTY;
    }
    return serviceMethod().pipe(
      tap((data: T) => ctx.patchState({ [key]: data }))
    );
  }

  @Action(LoadWidgetType)
  loadWidgetTypes(ctx: StateContext<ChartDataStateModel>) {
    return this.fetchChartData(ctx, 'widgetType', () =>
      this.chartDataService.getWidgetTypeList()
    );
  }

  @Action(LoadOccupancyChart)
  loadOccupancyChartData(ctx: StateContext<ChartDataStateModel>) {
    return this.fetchChartData(ctx, 'occupancyChart', () =>
      this.chartDataService.getOccupancyChartData()
    );
  }

  @Action(LoadCheckInChart)
  loadCheckInChartData(ctx: StateContext<ChartDataStateModel>) {
    return this.fetchChartData(ctx, 'checkInChart', () =>
      this.chartDataService.getCheckInChartData()
    );
  }

  @Action(LoadTimeSeriesChart)
  loadTimeSeriesChartData(ctx: StateContext<ChartDataStateModel>) {
    return this.fetchChartData(ctx, 'timeSeriesChart', () =>
      this.chartDataService.getTimeSeriesChartData()
    );
  }
}
