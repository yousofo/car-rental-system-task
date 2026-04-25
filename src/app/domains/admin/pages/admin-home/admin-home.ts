import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { TranslatePipe } from '@ngx-translate/core';

@Component({
  selector: 'app-admin-home',
  imports: [RouterLink, TranslatePipe],
  templateUrl: './admin-home.html',
  styleUrl: './admin-home.css',
})
export class AdminHome {
  protected cards = [
    { title: 'ADMIN_DASHBOARD.CARS_TITLE', copy: 'ADMIN_DASHBOARD.CARS_COPY', path: '/admin/cars' },
    { title: 'ADMIN_DASHBOARD.ORDERS_TITLE', copy: 'ADMIN_DASHBOARD.ORDERS_COPY', path: '/admin/orders' },
    { title: 'ADMIN_DASHBOARD.USERS_TITLE', copy: 'ADMIN_DASHBOARD.USERS_COPY', path: '/admin/users' },
  ];
}
