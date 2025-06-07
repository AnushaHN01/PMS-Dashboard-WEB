import { createFeatureSelector, createSelector } from '@ngrx/store';
import { EmployeeState } from './employee.reducer';

export const selectEmployeeState =
  createFeatureSelector<EmployeeState>('employee');

export const selectAllEmployees = createSelector(
  selectEmployeeState,
  (state) => state.employees
);
