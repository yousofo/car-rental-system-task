import { OrderDto, OrderType, PaginatedResponse, PaginationQuery, PaymentType } from '@/shared/api-models/api.models';

export interface CustomerOrdersQueryDto extends PaginationQuery {}

export interface CreateCustomerOrderRequestDto {
  car_id: number;
  delivery_date: string;
  receiving_date: string;
  payment_type: PaymentType;
  order_type: OrderType;
  down_payment?: number;
  number_of_installments?: number;
}

export type CustomerOrdersListResponseDto = PaginatedResponse<OrderDto>;
