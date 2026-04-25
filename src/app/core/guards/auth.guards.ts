import { inject } from '@angular/core';
import { CanActivateFn, CanActivateChildFn, CanMatchFn, Route, Router, UrlSegment } from '@angular/router';
import { AuthService } from '../services/auth-service';
import { UserRole } from '@/shared/api-models/api.models';

function redirectByRole(role: UserRole | null): string {
  if (role === 'admin') return '/admin';
  if (role === 'customer') return '/cars';
  return '/login';
}

function hasRole(role: UserRole) {
  const authService = inject(AuthService);
  return authService.isAuthenticated() && authService.userRole() === role;
}

export const guestOnlyGuard: CanActivateFn = () => {
  const authService = inject(AuthService);
  const router = inject(Router);

  if (!authService.isAuthenticated()) return true;

  return router.createUrlTree([redirectByRole(authService.userRole())]);
};

export const adminMatchGuard: CanMatchFn = (_route: Route, _segments: UrlSegment[]) => {
  const authService = inject(AuthService);
  const router = inject(Router);
  return hasRole('admin') ? true : router.createUrlTree([redirectByRole(authService.userRole())]);
};

export const customerMatchGuard: CanMatchFn = (_route: Route, segments: UrlSegment[]) => {
  const authService = inject(AuthService);
  const router = inject(Router);

  if (!segments.length) return true;

  return hasRole('customer') ? true : router.createUrlTree([redirectByRole(authService.userRole())]);
};

export const adminChildGuard: CanActivateChildFn = () => {
  const authService = inject(AuthService);
  const router = inject(Router);
  return hasRole('admin') ? true : router.createUrlTree([redirectByRole(authService.userRole())]);
};

export const customerChildGuard: CanActivateChildFn = () => {
  const authService = inject(AuthService);
  const router = inject(Router);
  return hasRole('customer') ? true : router.createUrlTree([redirectByRole(authService.userRole())]);
};
