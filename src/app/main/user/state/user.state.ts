import { computed, inject, signal } from '@angular/core';
import { Injectable, effect } from '@angular/core';
import { UserService } from '../services/user.service';
import { User } from '../models/user.model';

@Injectable({ providedIn: 'root' })
export class UserStore {
  private userService = inject(UserService);

  private employees = signal<User[]>([]);
  private loading = signal(false);

  readonly employees$ = computed(() => this.employees());
  readonly isLoading = computed(() => this.loading());

  loadEmployees() {
    this.loading.set(true);
    this.userService.getEmployees().subscribe((data) => {
      this.employees.set(data);
      this.loading.set(false);
    });
  }

  addEmployee(newEmp: User) {
    this.userService.addEmployee(newEmp).subscribe((created) => {
      this.employees.update((prev) => [...prev, created]);
    });
  }

  updateEmployee(updatedEmp: User) {
    this.userService
      .updateEmployee(updatedEmp.id!, updatedEmp)
      .subscribe((updated) => {
        this.employees.update((prev) =>
          prev.map((e) => (e.id === updated.id ? updated : e))
        );
      });
  }

  deleteEmployee(id: number) {
    this.userService.deleteEmployee(id).subscribe(() => {
      this.employees.update((prev) => prev.filter((e) => e.id !== id));
    });
  }
}
