import { HttpInterceptorFn } from '@angular/common/http';

export const bearerTokenInterceptor: HttpInterceptorFn = (req, next) => {
  return next(req);
};
