import { createAction, props } from '@ngrx/store';
import { Employee } from '../models/employee.model';

export const loadEmployees = createAction('[Employee] Load');
export const loadEmployeesSuccess = createAction(
  '[Employee] Load Success',
  props<{ employees: Employee[] }>()
);

export const addEmployee = createAction(
  '[Employee] Add',
  props<{ employee: Employee }>()
);
export const addEmployeeSuccess = createAction(
  '[Employee] Add Success',
  props<{ employee: Employee }>()
);

export const updateEmployee = createAction(
  '[Employee] Update',
  props<{ id: number; employee: Employee }>()
);
export const updateEmployeeSuccess = createAction(
  '[Employee] Update Success',
  props<{ id: number; employee: Employee }>()
);

export const deleteEmployee = createAction(
  '[Employee] Delete',
  props<{ id: number }>()
);
export const deleteEmployeeSuccess = createAction(
  '[Employee] Delete Success',
  props<{ id: number }>()
);
