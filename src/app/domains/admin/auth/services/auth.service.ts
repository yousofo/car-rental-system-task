import { Injectable, inject } from '@angular/core';
import { tap } from 'rxjs';
import { AuthService } from '@/core/services/auth-service';
import { AdminAuthApi } from '../api/auth.api';
import { AdminLoginRequestDto, AdminRegisterRequestDto } from '../api/auth.dto';

@Injectable({
  providedIn: 'root',
})
export class AdminAuthService {
  private authApi = inject(AdminAuthApi);
  private authService = inject(AuthService);

  register(payload: AdminRegisterRequestDto) {
    return this.authApi.register(payload).pipe(
      tap((data) => {
        this.authService.setSession(data.token, data.user, 'admin');
      }),
    );
  }

  login(payload: AdminLoginRequestDto, remember = true) {
    return this.authApi.login(payload).pipe(
      tap((data) => {
        this.authService.setSession(data.token, data.user, 'admin', remember);
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
