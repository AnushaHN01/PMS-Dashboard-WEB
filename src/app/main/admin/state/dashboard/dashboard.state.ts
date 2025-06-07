import { State, Action, StateContext, Selector } from '@ngxs/store';
import { Injectable } from '@angular/core';
import { tap } from 'rxjs';

import { DashboardService } from '../../services/dashboard.service';
import { LoadMetrics } from './dashboard.actions';
import { LayoutStateModel } from './dashboard.model';
import { DropdownModel } from '../../../layout/models/dropdown.model';

@State<LayoutStateModel>({
  name: 'layout',
  defaults: {
    metrics: [],
  },
})
@Injectable()
export class LayoutState {
  constructor(private dashboardService: DashboardService) {}

  @Selector()
  static getMetrics({ metrics }: LayoutStateModel) {
    return metrics;
  }

  private fetchData<T extends DropdownModel[] | undefined>(
    ctx: StateContext<LayoutStateModel>,
    key: keyof LayoutStateModel,
    serviceMethod: () => any
  ) {
    return serviceMethod().pipe(
      tap((data: T) => ctx.patchState({ [key]: data }))
    );
  }

  @Action(LoadMetrics)
  loadMetrics(ctx: StateContext<LayoutStateModel>) {
    return this.fetchData(ctx, 'metrics', () =>
      this.dashboardService.getMetrics()
    );
  }
}
