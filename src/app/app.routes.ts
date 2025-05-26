import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: 'admin',
    loadComponent: () =>
      import(
        './main/admin/components/admin-dashboard/admin-dashboard.component'
      ).then((m) => m.AdminDashboardComponent),
  },
  {
    path: 'bookings',
    loadComponent: () =>
      import(
        './main/bookings/components/bookings-dashboard/bookings-dashboard.component'
      ).then((m) => m.BookingsDashboardComponent),
  },
];
