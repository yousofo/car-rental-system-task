import { ApiMessageResponse, UserDto } from '@/shared/api-models/api.models';

export interface AdminRegisterRequestDto {
  name: string;
  email: string;
  password: string;
  password_confirmation: string;
  phone: string;
  country: string;
}

export interface AdminLoginRequestDto {
  email: string;
  password: string;
}

export interface AdminAuthResponseDto extends ApiMessageResponse {
  user: UserDto;
  token: string;
}
