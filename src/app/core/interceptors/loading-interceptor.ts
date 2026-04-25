import { LoadingService } from '../services/loading-service';
import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { finalize } from 'rxjs';

export const loadingInterceptor: HttpInterceptorFn = (req, next) => {
  const loadingService = inject(LoadingService);
  
  loadingService.addLoading();
  return next(req).pipe(finalize(() => loadingService.removeLoading()));
};
