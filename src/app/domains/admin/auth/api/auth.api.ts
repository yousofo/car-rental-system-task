import { Injectable } from '@angular/core';
import { BaseApiService } from '@/core/api/base-api-service';
import { ENDPOINTS } from '@/core/api/endpoints';
import { withSkipAuth } from '@/core/api/api-client';
import { ApiMessageResponse, UserDto } from '@/shared/api-models/api.models';
import { AdminAuthResponseDto, AdminLoginRequestDto, AdminRegisterRequestDto } from './auth.dto';

@Injectable({
  providedIn: 'root',
})
export class AdminAuthApi extends BaseApiService {
  register(payload: AdminRegisterRequestDto) {
    return this.apiClient.post<AdminAuthResponseDto>(ENDPOINTS.AUTH.ADMIN.REGISTER, payload, {
      context: withSkipAuth(),
    });
  }

  login(payload: AdminLoginRequestDto) {
    return this.apiClient.post<AdminAuthResponseDto>(ENDPOINTS.AUTH.ADMIN.LOGIN, payload, {
      context: withSkipAuth(),
    });
  }

  me() {
    return this.apiClient.get<UserDto>(ENDPOINTS.AUTH.ADMIN.ME);
  }

  logout() {
    return this.apiClient.post<ApiMessageResponse>(ENDPOINTS.AUTH.ADMIN.LOGOUT, {});
  }
}
