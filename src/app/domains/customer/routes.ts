import { Routes } from '@angular/router';
import { customerChildGuard } from '@/core/guards/auth.guards';
import { CarsPreview } from './cars/pages/cars-preview/cars-preview';
import { CarDetails } from './cars/pages/car-details/car-details';
import { Layout } from './layout/layout';
import { CreateOrder } from './orders/pages/create-order/create-order';
import { OrderDetails } from './orders/pages/order-details/order-details';
import { OrdersList } from './orders/pages/orders-list/orders-list';
import { InstallmentsList } from './installments/pages/installments-list/installments-list';

export default [
  {
    path: '',
    component: Layout,
    canActivateChild: [customerChildGuard],
    children: [
      {
        path: 'cars',
        component: CarsPreview,
      },
      {
        path: 'cars/:id',
        component: CarDetails,
      },
      {
        path: 'installments',
        component: InstallmentsList,
      },
      {
        path: 'orders',
        component: OrdersList,
      },
      {
        path: 'orders/new/:carId',
        component: CreateOrder,
      },
      {
        path: 'orders/:id',
        component: OrderDetails,
      },
    ],
  },
] satisfies Routes;
