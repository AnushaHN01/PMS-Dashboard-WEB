import { Component, inject, OnInit } from '@angular/core';
import { UserStore } from '../../state/user.state';
import { NgFor, NgIf } from '@angular/common';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { User } from '../../models/user.model';

@Component({
  selector: 'app-user',
  standalone: true,
  imports: [NgFor, NgIf, ReactiveFormsModule],
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss'],
})
export class UserComponent implements OnInit {
  private fb = inject(FormBuilder);
  public store = inject(UserStore);

  userForm!: FormGroup;
  editingEmployeeId: number | null = null;

  ngOnInit(): void {
    this.initForm();
    this.store.loadEmployees();
  }

  private initForm(): void {
    this.userForm = this.fb.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      department: ['', Validators.required],
    });
  }

  onSubmit(): void {
    if (this.userForm.invalid) return;

    const formValue = this.userForm.value;
    if (this.editingEmployeeId !== null) {
      const updated: User = { ...formValue, id: this.editingEmployeeId };
      this.store.updateEmployee(updated);
      this.editingEmployeeId = null;
    } else {
      this.store.addEmployee(formValue);
    }

    this.userForm.reset();
  }

  editUser(emp: User): void {
    this.editingEmployeeId = emp.id ?? null;
    this.userForm.setValue({
      name: emp.name,
      email: emp.email,
      department: emp.department,
    });
  }

  deleteUser(id: number): void {
    this.store.deleteEmployee(id);
  }

  trackById(index: number, emp: User): number {
    return emp.id!;
  }
}
