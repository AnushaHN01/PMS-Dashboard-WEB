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
      { title: 'Rooms', href: './rooms' },
      { title: 'Guests', href: './guests' },
      { title: 'Settings', href: './settings' },
    ];
  }
}
