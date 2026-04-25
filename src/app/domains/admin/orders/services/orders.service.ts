import { Injectable, inject } from '@angular/core';
import { AdminOrdersApi } from '../api/orders.api';
import { AdminOrdersQueryDto, UpdateAdminOrderStatusRequestDto } from '../api/orders.dto';

@Injectable({
  providedIn: 'root',
})
export class AdminOrdersService {
  private ordersApi = inject(AdminOrdersApi);

  list(query?: AdminOrdersQueryDto) {
    return this.ordersApi.list(query);
  }

  show(orderId: number) {
    return this.ordersApi.show(orderId);
  }

  updateStatus(orderId: number, payload: UpdateAdminOrderStatusRequestDto) {
    return this.ordersApi.updateStatus(orderId, payload);
  }

  delete(orderId: number) {
    return this.ordersApi.delete(orderId);
  }
}
