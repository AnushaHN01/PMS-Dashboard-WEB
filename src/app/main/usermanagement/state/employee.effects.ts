import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { EmployeeService } from '../services/employee.service';
import * as EmployeeActions from './employee.actions';
import { catchError, map, mergeMap, of } from 'rxjs';

@Injectable()
export class EmployeeEffects {
  constructor(private actions$: Actions, private service: EmployeeService) {
    console.log(this.actions$);
  }

  loadEmployees$ = createEffect(() =>
    this.actions$.pipe(
      ofType(EmployeeActions.loadEmployees),
      mergeMap(() =>
        this.service.getEmployees().pipe(
          map((employees) =>
            EmployeeActions.loadEmployeesSuccess({ employees })
          ),
          catchError(() => of({ type: '[Employee] Load Failed' }))
        )
      )
    )
  );

  addEmployee$ = createEffect(() =>
    this.actions$.pipe(
      ofType(EmployeeActions.addEmployee),
      mergeMap((action) =>
        this.service.addEmployee(action.employee).pipe(
          map((employee) => EmployeeActions.addEmployeeSuccess({ employee })),
          catchError(() => of({ type: '[Employee] Add Failed' }))
        )
      )
    )
  );

  updateEmployee$ = createEffect(() =>
    this.actions$.pipe(
      ofType(EmployeeActions.updateEmployee),
      mergeMap((action) => {
        const id = action.employee.id ?? 0;
        return this.service.updateEmployee(id, action.employee).pipe(
          map((updatedEmployee) =>
            EmployeeActions.updateEmployeeSuccess({
              id: id,
              employee: updatedEmployee,
            })
          ),
          catchError(() => of({ type: '[Employee] Update Failed' }))
        );
      })
    )
  );

  deleteEmployee$ = createEffect(() =>
    this.actions$.pipe(
      ofType(EmployeeActions.deleteEmployee),
      mergeMap((action) =>
        this.service.deleteEmployee(action.id).pipe(
          map(() => EmployeeActions.deleteEmployeeSuccess({ id: action.id })),
          catchError(() => of({ type: '[Employee] Delete Failed' }))
        )
      )
    )
  );
}

// Component
//    ↓
// dispatch(Action)
//    ↓
// Effect (optional, for side-effects)
//    ↓
// Reducer (pure function)
//    ↓
// Store State updates
//    ↓
// select(selector)
//    ↓
// Component auto-updates
