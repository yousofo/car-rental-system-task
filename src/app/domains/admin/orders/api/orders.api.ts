import { Injectable } from '@angular/core';
import { BaseApiService } from '@/core/api/base-api-service';
import { ENDPOINTS } from '@/core/api/endpoints';
import { ApiMessageResponse, OrderDto } from '@/shared/api-models/api.models';
import { AdminOrdersListResponseDto, AdminOrdersQueryDto, UpdateAdminOrderStatusRequestDto } from './orders.dto';

@Injectable({
  providedIn: 'root',
})
export class AdminOrdersApi extends BaseApiService {
  list(query?: AdminOrdersQueryDto) {
    return this.apiClient.get<AdminOrdersListResponseDto>(ENDPOINTS.ADMIN.ORDERS.ROOT, {
      params: query as Record<string, string | number | boolean | readonly (string | number | boolean)[]> | undefined,
    });
  }

  show(orderId: number) {
    return this.apiClient.get<OrderDto>(ENDPOINTS.ADMIN.ORDERS.byId(orderId));
  }

  updateStatus(orderId: number, payload: UpdateAdminOrderStatusRequestDto) {
    return this.apiClient.put<OrderDto>(ENDPOINTS.ADMIN.ORDERS.byId(orderId), payload);
  }

  delete(orderId: number) {
    return this.apiClient.delete<ApiMessageResponse>(ENDPOINTS.ADMIN.ORDERS.byId(orderId));
  }
}
