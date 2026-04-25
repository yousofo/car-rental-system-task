import { Routes } from '@angular/router';
import { Login } from './public/pages/login/login';
import { Register } from './public/pages/register/register';
import { Home } from './public/pages/home/home';
import { adminMatchGuard, customerMatchGuard, guestOnlyGuard } from './core/guards/auth.guards';

export const routes: Routes = [
  //public
  {
    path: '',
    component: Home,
    pathMatch: 'full',
    canActivate: [guestOnlyGuard],
  },
  {
    path: 'login',
    component: Login,
    canActivate: [guestOnlyGuard],
  },
  {
    path: 'register',
    component: Register,
    canActivate: [guestOnlyGuard],
  },
  {
    path: 'admin',
    canMatch: [adminMatchGuard],
    loadChildren: () => import('./domains/admin/routes').then((m) => m.default),
  },
  {
    path: '',
    canMatch: [customerMatchGuard],
    loadChildren: () => import('./domains/customer/routes').then((m) => m.default),
  },
  {
    path: '**',
    redirectTo: '',
  },
];
