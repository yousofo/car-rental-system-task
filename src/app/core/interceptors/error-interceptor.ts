import { HttpErrorResponse, HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { MessageService } from 'primeng/api';
import { catchError } from 'rxjs';
import { AuthService } from '../services/auth-service';

export const errorInterceptor: HttpInterceptorFn = (req, next) => {
  const messageService = inject(MessageService);
  const translateService = inject(TranslateService);
  const authService = inject(AuthService);
  const router = inject(Router);

  return next(req).pipe(
    catchError((errorResponse: HttpErrorResponse) => {
      if (errorResponse.status === 401) {
        if (authService.isAuthenticated()) {
          const detail = errorResponse.error?.message || translateService.instant('ERRORS.UNAUTHORIZED');
          messageService.add({
            severity: 'warn',
            summary: translateService.instant('MESSAGES.SESSION_TITLE'),
            detail,
          });
        }
        authService.clearSession();
        void router.navigateByUrl('/login');
        throw errorResponse;
      }

      if (errorResponse.status === 403) {
        const detail = errorResponse.error?.message || translateService.instant('ERRORS.UNAUTHORIZED');
        messageService.add({
          severity: 'warn',
          summary: translateService.instant('MESSAGES.SESSION_TITLE'),
          detail,
        });
        throw errorResponse;
      }

      {
        const backendMessage = errorResponse.error?.message;
        const errorMessage = backendMessage
          ? backendMessage
          : translateService.instant('ERRORS.INVALID_REQUEST');
        messageService.add({
          severity: 'error',
          summary: translateService.instant('MESSAGES.ERROR_TITLE'),
          detail: errorMessage,
        });
      }

      throw errorResponse.error ?? errorResponse;
    }),
  );
};
