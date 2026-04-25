import { DatePipe } from '@angular/common';
import { Component, DestroyRef, inject } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { TranslatePipe } from '@ngx-translate/core';
import { Skeleton } from 'primeng/skeleton';
import { CustomerCarsService } from '../../services/cars.service';
import { CustomerCar } from '../../services/car.mapper';

@Component({
  selector: 'app-car-details',
  imports: [RouterLink, TranslatePipe, Skeleton, DatePipe],
  templateUrl: './car-details.html',
  styleUrl: './car-details.css',
})
export class CarDetails {
  private route = inject(ActivatedRoute);
  private carsService = inject(CustomerCarsService);
  private destroyRef = inject(DestroyRef);

  protected car: CustomerCar | null = null;
  protected loading = true;
  protected error = false;

  ngOnInit() {
    this.route.paramMap.pipe(takeUntilDestroyed(this.destroyRef)).subscribe((params) => {
      const carId = Number(params.get('id'));

      if (!carId) {
        this.error = true;
        this.loading = false;
        this.car = null;
        return;
      }

      this.loadCar(carId);
    });
  }

  private loadCar(carId: number) {
    this.loading = true;
    this.error = false;

    this.carsService.show(carId).subscribe({
      next: (car) => {
        this.car = car;
      },
      error: () => {
        this.car = null;
        this.error = true;
        this.loading = false;
      },
      complete: () => {
        this.loading = false;
      },
    });
  }
}
