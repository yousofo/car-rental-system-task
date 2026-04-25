import { Injectable, inject } from '@angular/core';
import { map } from 'rxjs';
import { CustomerCarsApi } from '../api/cars.api';
import { CustomerCarsQueryDto } from '../api/cars.dto';
import { mapCarDtoToCustomerCar } from './car.mapper';

@Injectable({
  providedIn: 'root',
})
export class CustomerCarsService {
  private carsApi = inject(CustomerCarsApi);

  list(query?: CustomerCarsQueryDto) {
    return this.carsApi.list(query).pipe(
      map((response) => ({
        ...response,
        data: response.data.map(mapCarDtoToCustomerCar),
      })),
    );
  }

  show(carId: number) {
    return this.carsApi.show(carId).pipe(map(mapCarDtoToCustomerCar));
  }
}
