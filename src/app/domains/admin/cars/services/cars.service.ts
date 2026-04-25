import { Injectable, inject } from '@angular/core';
import { AdminCarsApi } from '../api/cars.api';
import { AdminCarsQueryDto, CreateAdminCarRequestDto, UpdateAdminCarRequestDto } from '../api/cars.dto';

@Injectable({
  providedIn: 'root',
})
export class AdminCarsService {
  private carsApi = inject(AdminCarsApi);

  list(query?: AdminCarsQueryDto) {
    return this.carsApi.list(query);
  }

  show(carId: number) {
    return this.carsApi.show(carId);
  }

  create(payload: CreateAdminCarRequestDto) {
    return this.carsApi.create(payload);
  }

  update(carId: number, payload: UpdateAdminCarRequestDto) {
    return this.carsApi.update(carId, payload);
  }

  delete(carId: number) {
    return this.carsApi.delete(carId);
  }
}
