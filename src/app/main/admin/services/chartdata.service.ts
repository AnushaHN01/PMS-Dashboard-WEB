import { Injectable } from '@angular/core';
import { addDays, formatISO } from 'date-fns';

@Injectable({
  providedIn: 'root',
})
export class ChartDataService {
  getBarChartData(): any {
    return {
      labels: ['Deluxe', 'Standard', 'Suite', 'Family', 'Economy'],
      datasets: [
        {
          label: 'Occupancy Count',
          backgroundColor: '#42A5F5',
          data: [120, 95, 60, 30, 25],
        },
      ],
    };
  }

  getTimeSeriesChartData(): any {
    const startDate = new Date(2025, 4, 1); // May 1, 2025
    const counts = [20, 25, 28, 30, 35, 40, 42, 45, 48, 50, 52, 53, 54, 55];

    const dataPoints = counts.map((count, i) => ({
      x: formatISO(addDays(startDate, i), { representation: 'date' }),
      y: count,
    }));

    return {
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
    };
  }
}
