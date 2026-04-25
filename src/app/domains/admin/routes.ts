import { Routes } from '@angular/router';
import { adminChildGuard } from '@/core/guards/auth.guards';
import { Layout } from './layout/layout';
import { AdminHome } from './pages/admin-home/admin-home';
import { AdminCarsList } from './cars/pages/cars-list/cars-list';
import { AdminCarForm } from './cars/pages/car-form/car-form';
import { AdminUsersList } from './users/pages/users-list/users-list';
import { AdminUserDetails } from './users/pages/user-details/user-details';
import { AdminOrdersList } from './orders/pages/orders-list/orders-list';
import { AdminOrderDetails } from './orders/pages/order-details/order-details';

export default [
  {
    path: '',
    component: Layout,
    canActivateChild: [adminChildGuard],
    children: [
      {
        path: '',
        component: AdminHome,
      },
      {
        path: 'cars',
        component: AdminCarsList,
      },
      {
        path: 'cars/new',
        component: AdminCarForm,
      },
      {
        path: 'cars/:id',
        component: AdminCarForm,
      },
      {
        path: 'users',
        component: AdminUsersList,
      },
      {
        path: 'users/:id',
        component: AdminUserDetails,
      },
      {
        path: 'orders',
        component: AdminOrdersList,
      },
      {
        path: 'orders/:id',
        component: AdminOrderDetails,
      },
    ],
  },
] satisfies Routes;
