import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { User } from '../models/user.model';

@Injectable({ providedIn: 'root' })
export class UserService {
  private baseUrl = '/api/Employee';

  constructor(private http: HttpClient) {}

  getEmployees(): Observable<User[]> {
    return this.http.get<User[]>(this.baseUrl);
  }

  addEmployee(employee: User): Observable<User> {
    return this.http.post<User>(this.baseUrl, employee);
  }

  updateEmployee(id: number, employee: User): Observable<User> {
    return this.http.put<User>(`${this.baseUrl}/${id}`, employee);
  }

  deleteEmployee(id: number): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/${id}`);
  }
}
