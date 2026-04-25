export interface ApiMessageResponse {
  message: string;
}

export interface ValidationErrorResponse {
  message: string;
  errors: Record<string, string[]>;
}

export interface PaginationLink {
  url: string | null;
  label: string;
  active: boolean;
}

export interface PaginatedResponse<T> {
  current_page: number;
  data: T[];
  first_page_url: string;
  from: number | null;
  last_page: number;
  last_page_url: string;
  links: PaginationLink[];
  next_page_url: string | null;
  path: string;
  per_page: number;
  prev_page_url: string | null;
  to: number | null;
  total: number;
}

export type QueryValue = string | number | boolean | ReadonlyArray<string | number | boolean>;

export interface PaginationQuery {
  [key: string]: QueryValue | undefined;
  page?: number;
  per_page?: number;
}

export type UserRole = 'admin' | 'customer';
export type PaymentType = 'visa' | 'cash' | 'tamara';
export type PaymentStatus = 'pending' | 'success';
export type OrderType = 'full' | 'installments';
export type InstallmentStatus = 'pending' | 'paid';

export interface UserDto {
  id: number;
  name: string;
  email: string;
  phone: string | null;
  country: string | null;
  wallet: string | number | null;
  role: UserRole;
  created_at: string;
  updated_at: string;
}

export interface CarDto {
  id: number;
  name: string;
  brand: string;
  model: string;
  kilometers: number;
  price_per_day: string | number;
  created_at: string;
  updated_at: string;
}

export interface InstallmentDto {
  id: number;
  order_id: number;
  amount: string | number;
  due_date: string;
  status: InstallmentStatus;
  paid_at: string | null;
  created_at: string;
  updated_at: string;
}

export interface OrderDto {
  id: number;
  user_id: number;
  car_id: number;
  delivery_date: string;
  receiving_date: string;
  days: number;
  total_price: string | number;
  points: number;
  payment_type: PaymentType;
  payment_status: PaymentStatus;
  order_type: OrderType;
  created_at: string;
  updated_at: string;
  user?: UserDto;
  car?: CarDto;
  installments?: InstallmentDto[];
}
