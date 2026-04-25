import { Injectable } from '@angular/core';
import { BaseApiService } from '@/core/api/base-api-service';
import { ENDPOINTS } from '@/core/api/endpoints';
import { ApiMessageResponse, UserDto } from '@/shared/api-models/api.models';
import {
  AdminUserDetailsDto,
  AdminUsersListResponseDto,
  AdminUsersQueryDto,
  CreateAdminUserRequestDto,
  UpdateAdminUserRequestDto,
} from './users.dto';

@Injectable({
  providedIn: 'root',
})
export class AdminUsersApi extends BaseApiService {
  list(query?: AdminUsersQueryDto) {
    return this.apiClient.get<AdminUsersListResponseDto>(ENDPOINTS.ADMIN.USERS.ROOT, {
      params: query as Record<string, string | number | boolean | readonly (string | number | boolean)[]> | undefined,
    });
  }

  show(userId: number) {
    return this.apiClient.get<AdminUserDetailsDto>(ENDPOINTS.ADMIN.USERS.byId(userId));
  }

  create(payload: CreateAdminUserRequestDto) {
    return this.apiClient.post<UserDto>(ENDPOINTS.ADMIN.USERS.ROOT, payload);
  }

  update(userId: number, payload: UpdateAdminUserRequestDto) {
    return this.apiClient.put<UserDto>(ENDPOINTS.ADMIN.USERS.byId(userId), payload);
  }

  delete(userId: number) {
    return this.apiClient.delete<ApiMessageResponse>(ENDPOINTS.ADMIN.USERS.byId(userId));
  }
}
