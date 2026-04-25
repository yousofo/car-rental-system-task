import { Injectable } from '@angular/core';
import { BaseApiService } from '@/core/api/base-api-service';
import { ENDPOINTS } from '@/core/api/endpoints';
import { CarDto } from '@/shared/api-models/api.models';
import { CustomerCarsListResponseDto, CustomerCarsQueryDto } from './cars.dto';

@Injectable({
  providedIn: 'root',
})
export class CustomerCarsApi extends BaseApiService {
  list(query?: CustomerCarsQueryDto) {
    return this.apiClient.get<CustomerCarsListResponseDto>(ENDPOINTS.CUSTOMER.CARS.ROOT, {
      params: query as Record<string, string | number | boolean | readonly (string | number | boolean)[]> | undefined,
    });
  }

  show(carId: number) {
    return this.apiClient.get<CarDto>(ENDPOINTS.CUSTOMER.CARS.byId(carId));
  }
}
