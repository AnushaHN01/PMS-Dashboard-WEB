import {
  Component,
  OnInit,
  inject,
  ChangeDetectionStrategy,
} from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  Validators,
  ReactiveFormsModule,
} from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { Employee } from '../../models/employee.model';
import {
  loadEmployees,
  addEmployee,
  updateEmployee,
  deleteEmployee,
} from '../../state/employee.actions';
import { selectAllEmployees } from '../../state/employee.selectors';

@Component({
  selector: 'app-employee',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './employee.component.html',
  styleUrls: ['./employee.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class EmployeeComponent implements OnInit {
  private fb = inject(FormBuilder);
  private store = inject(Store);

  employeeForm!: FormGroup;
  editingEmployeeId: number | null = null;

  employees$: Observable<Employee[]> = this.store.select(selectAllEmployees);

  ngOnInit(): void {
    this.initForm();
    this.store.dispatch(loadEmployees());
  }

  private initForm(): void {
    this.employeeForm = this.fb.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      department: ['', Validators.required],
    });
  }

  onSubmit(): void {
    if (this.employeeForm.invalid) return;

    const formValue = this.employeeForm.value;
    if (this.editingEmployeeId !== null) {
      const updated: Employee = { ...formValue, id: this.editingEmployeeId };
      this.store.dispatch(
        updateEmployee({ id: updated.id!, employee: updated })
      );
      this.editingEmployeeId = null;
    } else {
      this.store.dispatch(addEmployee({ employee: formValue }));
    }

    this.employeeForm.reset();
  }

  editEmployee(emp: Employee): void {
    this.editingEmployeeId = emp.id ?? null;
    this.employeeForm.setValue({
      name: emp.name,
      email: emp.email,
      department: emp.department,
    });
  }

  deleteEmployee(id: number): void {
    this.store.dispatch(deleteEmployee({ id }));
    if (this.editingEmployeeId === id) {
      this.editingEmployeeId = null;
      this.employeeForm.reset();
    }
  }

  trackById(index: number, emp: Employee): number {
    return emp.id!;
  }
}
