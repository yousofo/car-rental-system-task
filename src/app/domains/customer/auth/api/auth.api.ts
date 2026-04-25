import { Injectable } from '@angular/core';
import { BaseApiService } from '@/core/api/base-api-service';
import { ENDPOINTS } from '@/core/api/endpoints';
import { ApiMessageResponse, UserDto } from '@/shared/api-models/api.models';
import { CustomerAuthResponseDto, CustomerLoginRequestDto, CustomerRegisterRequestDto } from './auth.dto';
import { withSkipAuth } from '@/core/api/api-client';

@Injectable({
  providedIn: 'root',
})
export class CustomerAuthApi extends BaseApiService {
  register(payload: CustomerRegisterRequestDto) {
    return this.apiClient.post<CustomerAuthResponseDto>(ENDPOINTS.AUTH.CUSTOMER.REGISTER, payload, {
      context: withSkipAuth(),
    });
  }

  login(payload: CustomerLoginRequestDto) {
    return this.apiClient.post<CustomerAuthResponseDto>(ENDPOINTS.AUTH.CUSTOMER.LOGIN, payload, {
      context: withSkipAuth(),
    });
  }

  me() {
    return this.apiClient.get<UserDto>(ENDPOINTS.AUTH.CUSTOMER.ME);
  }

  logout() {
    return this.apiClient.post<ApiMessageResponse>(ENDPOINTS.AUTH.CUSTOMER.LOGOUT, {});
  }
}
