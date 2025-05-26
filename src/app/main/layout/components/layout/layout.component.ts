import { Title } from 'chart.js';
import {
  ChangeDetectionStrategy,
  Component,
  computed,
  inject,
  OnInit,
  signal,
} from '@angular/core';

import { DashboardService } from '../../../admin/services/dashboard.service';
import { NavigationService } from '../../services/navigation.service';
import { NavLink } from '../../models/navigation.model';
import { NgFor, NgIf } from '@angular/common';
import { HighlightDirective } from '../../../shared/directives/highlight.directive';
import { DropdownModel } from '../../models/dropdown.model';

@Component({
  selector: 'layout',
  standalone: true,
  imports: [HighlightDirective],
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LayoutComponent implements OnInit {
  metrics = signal<DropdownModel[]>([]); // Use of signal
  navLinks: NavLink[] = [];
  navService = inject(NavigationService);

  constructor(private dashboardService: DashboardService) {}

  ngOnInit(): void {
    this.dashboardService.getMetrics().subscribe((data) => {
      this.metrics.set(data); //To set signal value
      // this.metrics.update((current) => [
      //   ...current,
      //   { title: `Today's Check-outs`, value: '5' }, //To update signal value
      // ]);
    });
    this.navLinks = this.navService.getNavLinks();

    //Computed will automatically recalculate for any update and reload the
    // const count = signal(2);
    // const doubleCount = computed(() => count() * 2);
    // console.log(doubleCount()); // 4
    // count.set(3);
    // console.log(doubleCount()); // 6
  }
}
