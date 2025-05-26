import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { DropdownModel } from '../../layout/models/dropdown.model';

@Injectable({
  providedIn: 'root',
})
export class DashboardService {
  getMetrics(): Observable<DropdownModel[]> {
    return of([
      { title: 'Total Bookings', value: '1,245' },
      { title: 'Available Rooms', value: 23 },
      { title: "Today's Check-ins", value: 58 },
      { title: 'Revenue', value: '$32,450' },
    ]);
  }
}
