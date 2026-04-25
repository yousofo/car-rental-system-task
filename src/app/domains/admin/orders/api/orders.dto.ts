import { OrderDto, PaginatedResponse, PaginationQuery, PaymentStatus } from '@/shared/api-models/api.models';

export interface AdminOrdersQueryDto extends PaginationQuery {}

export interface UpdateAdminOrderStatusRequestDto {
  payment_status: PaymentStatus;
}

export type AdminOrdersListResponseDto = PaginatedResponse<OrderDto>;
