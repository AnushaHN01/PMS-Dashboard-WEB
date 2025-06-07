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
  {
    path: 'product',
    loadComponent: () =>
      import('./main/product/components/product/product.component').then(
        (m) => m.ProductComponent
      ),
  },
  {
    path: 'employee',
    loadComponent: () =>
      import(
        './main/usermanagement/components/employee/employee.component'
      ).then((m) => m.EmployeeComponent),
  },
  {
    path: 'user',
    loadComponent: () =>
      import('./main/user/components/user/user.component').then(
        (m) => m.UserComponent
      ),
  },
];
