import { Injectable } from '@angular/core';
import { BaseApiService } from '@/core/api/base-api-service';
import { ENDPOINTS } from '@/core/api/endpoints';
import { OrderDto } from '@/shared/api-models/api.models';
import { CreateCustomerOrderRequestDto, CustomerOrdersListResponseDto, CustomerOrdersQueryDto } from './orders.dto';

@Injectable({
  providedIn: 'root',
})
export class CustomerOrdersApi extends BaseApiService {
  list(query?: CustomerOrdersQueryDto) {
    return this.apiClient.get<CustomerOrdersListResponseDto>(ENDPOINTS.CUSTOMER.ORDERS.ROOT, {
      params: query as Record<string, string | number | boolean | readonly (string | number | boolean)[]> | undefined,
    });
  }

  show(orderId: number) {
    return this.apiClient.get<OrderDto>(ENDPOINTS.CUSTOMER.ORDERS.byId(orderId));
  }

  create(payload: CreateCustomerOrderRequestDto) {
    return this.apiClient.post<OrderDto>(ENDPOINTS.CUSTOMER.ORDERS.ROOT, payload);
  }
}
