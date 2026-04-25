import { ApiMessageResponse, UserDto } from '@/shared/api-models/api.models';

export interface CustomerRegisterRequestDto {
  name: string;
  email: string;
  password: string;
  password_confirmation: string;
  phone: string;
  country: string;
}

export interface CustomerLoginRequestDto {
  email: string;
  password: string;
}

export interface CustomerAuthResponseDto extends ApiMessageResponse {
  user: UserDto;
  token: string;
}
