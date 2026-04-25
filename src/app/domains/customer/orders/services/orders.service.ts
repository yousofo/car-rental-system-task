import { Injectable, inject } from '@angular/core';
import { map } from 'rxjs';
import { CustomerOrdersApi } from '../api/orders.api';
import { CreateCustomerOrderRequestDto, CustomerOrdersQueryDto } from '../api/orders.dto';
import { mapOrderDtoToCustomerOrder } from './order.mapper';

@Injectable({
  providedIn: 'root',
})
export class CustomerOrdersService {
  private ordersApi = inject(CustomerOrdersApi);

  list(query?: CustomerOrdersQueryDto) {
    return this.ordersApi.list(query).pipe(
      map((response) => ({
        ...response,
        data: response.data.map(mapOrderDtoToCustomerOrder),
      })),
    );
  }

  show(orderId: number) {
    return this.ordersApi.show(orderId).pipe(map(mapOrderDtoToCustomerOrder));
  }

  create(payload: CreateCustomerOrderRequestDto) {
    return this.ordersApi.create(payload).pipe(map(mapOrderDtoToCustomerOrder));
  }
}
