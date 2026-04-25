import { Routes } from '@angular/router';
import { Login } from './public/pages/login/login';
import { Register } from './public/pages/register/register';
import { Home } from './public/pages/home/home';
import { adminMatchGuard, customerMatchGuard } from './core/guards/auth.guards';

export const routes: Routes = [
  //public
  {
    path: '',
    component: Home,
    pathMatch: 'full',
  },
  {
    path: 'login',
    component: Login,
  },
  {
    path: 'register',
    component: Register,
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
