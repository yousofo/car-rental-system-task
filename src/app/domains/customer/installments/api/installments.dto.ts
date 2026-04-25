import { InstallmentDto, OrderDto, PaginatedResponse, PaginationQuery } from '@/shared/api-models/api.models';

export interface CustomerInstallmentsQueryDto extends PaginationQuery {}

export interface CustomerInstallmentDto extends InstallmentDto {
  order?: OrderDto;
}

export type CustomerInstallmentsListResponseDto = PaginatedResponse<CustomerInstallmentDto>;
