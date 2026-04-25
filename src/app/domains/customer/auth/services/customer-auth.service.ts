import { Injectable, inject } from '@angular/core';
import { tap } from 'rxjs';
import { AuthService } from '@/core/services/auth-service';
import { CustomerAuthApi } from '../api/auth.api';
import { CustomerLoginRequestDto, CustomerRegisterRequestDto } from '../api/auth.dto';

@Injectable({
  providedIn: 'root',
})
export class CustomerAuthService {
  private authApi = inject(CustomerAuthApi);
  private authService = inject(AuthService);

  register(payload: CustomerRegisterRequestDto) {
    return this.authApi.register(payload).pipe(
      tap((data) => {
        this.authService.setSession(data.token, data.user, 'customer');
      }),
    );
  }

  login(payload: CustomerLoginRequestDto, remember = true) {
    return this.authApi.login(payload).pipe(
      tap({
        next: (data) => {
          this.authService.setSession(data.token, data.user, 'customer', remember);
        },
      }),
    );
  }

  me() {
    return this.authApi.me();
  }

  logout() {
    return this.authApi.logout();
  }
}
