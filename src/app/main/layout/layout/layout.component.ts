import { NgFor } from '@angular/common';
import { Component, OnInit } from '@angular/core';

import { AdminDashboardComponent } from '../../admin/components/admin-dashboard/admin-dashboard.component';
import { AdminSection } from '../../admin/models/enums';
import { DashboardModel } from '../../admin/models/dashboard';
import { DashboardService } from '../../admin/services/dashboard.service';

@Component({
  selector: 'layout',
  standalone: true,
  imports: [NgFor, AdminDashboardComponent],
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.scss'],
})
export class LayoutComponent implements OnInit {
  adminSections = Object.values(AdminSection);
  metrics: DashboardModel[] = [];
  constructor(private dashboardService: DashboardService) {}

  ngOnInit(): void {
    this.dashboardService.getMetrics().subscribe((data) => {
      this.metrics = data;
    });
  }
}
