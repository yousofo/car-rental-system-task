import { CarDto, PaginatedResponse, PaginationQuery } from '@/shared/api-models/api.models';

export interface CustomerCarsQueryDto extends PaginationQuery {
  search?: string;
  brand?: string;
  min_price?: number;
  max_price?: number;
}

export type CustomerCarsListResponseDto = PaginatedResponse<CarDto>;
