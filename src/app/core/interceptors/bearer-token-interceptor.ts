import { HttpInterceptorFn } from '@angular/common/http';
import { AuthService } from '../services/auth-service';
import { inject } from '@angular/core';
import { SKIP_AUTH } from '../api/api-client';

export const bearerTokenInterceptor: HttpInterceptorFn = (req, next) => {
  const authService = inject(AuthService);
  const token = authService.bearerToken();

  let skip = false;
  try {
    skip = req.context.get(SKIP_AUTH);
  } catch {
    skip = false;
  }

  if (skip || !token) return next(req);

  return next(
    req.clone({
      setHeaders: {
        Authorization: `Bearer ${token}`,
      },
    })
  );
};
