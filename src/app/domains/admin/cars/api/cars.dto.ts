import { CarDto, PaginatedResponse, PaginationQuery } from '@/shared/api-models/api.models';

export interface AdminCarsQueryDto extends PaginationQuery {}

export interface CreateAdminCarRequestDto {
  name: string;
  brand: string;
  model: string;
  kilometers: number;
  price_per_day: number;
}

export interface UpdateAdminCarRequestDto {
  name?: string;
  brand?: string;
  model?: string;
  kilometers?: number;
  price_per_day?: number;
}

export type AdminCarsListResponseDto = PaginatedResponse<CarDto>;
