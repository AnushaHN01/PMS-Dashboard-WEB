import { Injectable } from '@angular/core';
import { NavLink } from '../models/navigation.model';

@Injectable({
  providedIn: 'root',
})
export class NavigationService {
  getNavLinks(): NavLink[] {
    return [
      { title: 'Dashboard', href: './admin' },
      { title: 'Bookings', href: './bookings' },
      { title: 'Product - NGXS', href: './product' },
      { title: 'Employee - NGRX', href: './employee' },
      { title: 'User - Signal Store', href: './user' },
    ];
  }
}
