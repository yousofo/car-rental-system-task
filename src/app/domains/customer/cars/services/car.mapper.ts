import { CarDto } from '@/shared/api-models/api.models';

export interface CustomerCar {
  id: number;
  name: string;
  brand: string;
  model: string;
  kilometers: number;
  pricePerDay: number;
  createdAt: string;
  updatedAt: string;
}

export function mapCarDtoToCustomerCar(car: CarDto): CustomerCar {
  return {
    id: car.id,
    name: car.name,
    brand: car.brand,
    model: car.model,
    kilometers: car.kilometers,
    pricePerDay: Number(car.price_per_day),
    createdAt: car.created_at,
    updatedAt: car.updated_at,
  };
}
