import { OrderDto, PaginatedResponse, PaginationQuery, UserDto, UserRole } from '@/shared/api-models/api.models';

export interface AdminUsersQueryDto extends PaginationQuery {}

export interface AdminUserDetailsDto extends UserDto {
  orders: OrderDto[];
}

export interface CreateAdminUserRequestDto {
  name: string;
  email: string;
  password: string;
  phone: string;
  country: string;
  wallet: number;
  role: UserRole;
}

export interface UpdateAdminUserRequestDto {
  name?: string;
  email?: string;
  password?: string;
  phone?: string;
  country?: string;
  wallet?: number;
  role?: UserRole;
}

export type AdminUsersListResponseDto = PaginatedResponse<UserDto>;
