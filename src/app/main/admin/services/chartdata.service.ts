import { Injectable } from '@angular/core';
import { addDays, formatISO } from 'date-fns';
import { DropdownModel } from '../../layout/models/dropdown.model';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ChartDataService {
  getWidgetTypeList(): Observable<DropdownModel[]> {
    return of([
      { value: 'Occupancy', title: 'Top 5 Room Types by Occupancy' },
      { value: 'CheckIn', title: 'Check-in Count by Weekday' },
      { value: 'DailyCheckIn', title: 'Daily Check-ins over the past 14 days' },
    ]);
  }

  getOccupancyChartData(): Observable<any> {
    return of({
      labels: ['Deluxe', 'Standard', 'Suite', 'Family', 'Economy'],
      datasets: [
        {
          label: 'Occupancy Count',
          backgroundColor: '#42A5F5',
          data: [120, 95, 60, 30, 25],
        },
      ],
    });
  }

  getCheckInChartData(): Observable<any> {
    return of({
      labels: [
        'Sunday',
        'Monday',
        'Tuesday',
        'Wednesday',
        'Thursday',
        'Friday',
        'Saturday',
      ],
      datasets: [
        {
          label: 'Check-in Count by Weekday',
          backgroundColor: '#42A5F5',
          data: [45, 60, 70, 80, 95, 110, 85],
        },
      ],
    });
  }

  getTimeSeriesChartData(): Observable<any> {
    const startDate = new Date(2025, 4, 1); // May 1, 2025
    const counts = [20, 25, 28, 30, 35, 40, 42, 45, 48, 50, 52, 53, 54, 55];

    const dataPoints = counts.map((count, i) => ({
      x: formatISO(addDays(startDate, i), { representation: 'date' }),
      y: count,
    }));

    return of({
      datasets: [
        {
          label: 'Check-ins',
          data: dataPoints,
          borderColor: '#42A5F5',
          backgroundColor: 'rgba(66,165,245,0.2)',
          fill: true,
          tension: 0.3,
        },
      ],
    });
  }
}
