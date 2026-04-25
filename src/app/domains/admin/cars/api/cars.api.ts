import { Injectable } from '@angular/core';
import { BaseApiService } from '@/core/api/base-api-service';
import { ENDPOINTS } from '@/core/api/endpoints';
import { ApiMessageResponse, CarDto } from '@/shared/api-models/api.models';
import {
  AdminCarsListResponseDto,
  AdminCarsQueryDto,
  CreateAdminCarRequestDto,
  UpdateAdminCarRequestDto,
} from './cars.dto';

@Injectable({
  providedIn: 'root',
})
export class AdminCarsApi extends BaseApiService {
  list(query?: AdminCarsQueryDto) {
    return this.apiClient.get<AdminCarsListResponseDto>(ENDPOINTS.ADMIN.CARS.ROOT, {
      params: query as Record<string, string | number | boolean | readonly (string | number | boolean)[]> | undefined,
    });
  }

  show(carId: number) {
    return this.apiClient.get<CarDto>(ENDPOINTS.ADMIN.CARS.byId(carId));
  }

  create(payload: CreateAdminCarRequestDto) {
    return this.apiClient.post<CarDto>(ENDPOINTS.ADMIN.CARS.ROOT, payload);
  }

  update(carId: number, payload: UpdateAdminCarRequestDto) {
    return this.apiClient.put<CarDto>(ENDPOINTS.ADMIN.CARS.byId(carId), payload);
  }

  delete(carId: number) {
    return this.apiClient.delete<ApiMessageResponse>(ENDPOINTS.ADMIN.CARS.byId(carId));
  }
}
