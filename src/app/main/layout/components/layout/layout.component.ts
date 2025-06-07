import {
  ChangeDetectionStrategy,
  Component,
  inject,
  OnInit,
} from '@angular/core';
import { Store } from '@ngxs/store';
import { AsyncPipe } from '@angular/common';

import { NavigationService } from '../../services/navigation.service';
import { NavLink } from '../../models/navigation.model';
import { HighlightDirective } from '../../../shared/directives/highlight.directive';
import { LayoutState } from '../../../admin/state/dashboard/dashboard.state';
import { LoadMetrics } from '../../../admin/state/dashboard/dashboard.actions';

@Component({
  selector: 'layout',
  standalone: true,
  imports: [HighlightDirective, AsyncPipe],
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LayoutComponent implements OnInit {
  //metrics = signal<DropdownModel[]>([]); // Use of signal
  navLinks: NavLink[] = [];
  navService = inject(NavigationService);
  private store = inject(Store);
  metrics$ = this.store.select(LayoutState.getMetrics);

  constructor() {}

  ngOnInit(): void {
    this.store.dispatch(new LoadMetrics());

    // this.dashboardService.getMetrics().subscribe((data) => {
    //   this.metrics.set(data); //To set signal value
    //   // this.metrics.update((current) => [
    //   //   ...current,
    //   //   { title: `Today's Check-outs`, value: '5' }, //To update signal value
    //   // ]);
    // });

    this.navLinks = this.navService.getNavLinks();

    //Computed will automatically recalculate for any update and reload the
    // const count = signal(2);
    // const doubleCount = computed(() => count() * 2);
    // console.log(doubleCount()); // 4
    // count.set(3);
    // console.log(doubleCount()); // 6
  }
}
