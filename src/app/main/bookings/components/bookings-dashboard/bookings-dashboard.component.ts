import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { from, map, of, reduce } from 'rxjs';

@Component({
  selector: 'app-bookings-dashboard',
  standalone: true,
  templateUrl: './bookings-dashboard.component.html',
  styleUrls: ['./bookings-dashboard.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BookingsDashboardComponent implements OnInit {
  ngOnInit(): void {
    of(1, 2, 3).subscribe(console.log);

    from([10, 20, 30]).subscribe(console.log);

    of(1, 2, 3)
      .pipe(map((x) => x * 2))
      .subscribe(console.log);

    of(1, 2, 3, 4, 5)
      .pipe(reduce((acc, val) => acc + val, 0))
      .subscribe((result) => console.log(result));

    of('test', 'test')
      .pipe(reduce((acc, val) => acc + val, ''))
      .subscribe((result) => console.log(result));

    const peopleModel = of(
      { name: 'Alice', age: 30 },
      { name: 'Bob', age: 25 }
    );

    peopleModel
      .pipe(
        reduce((acc, person) => {
          acc.push(person);
          return acc;
        }, [] as { name: string; age: number }[])
      )
      .subscribe((result) => console.log(result));
  }
}
