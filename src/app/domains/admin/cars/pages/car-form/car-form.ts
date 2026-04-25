import { Component, DestroyRef, inject } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { TranslatePipe } from '@ngx-translate/core';
import { MessageService } from 'primeng/api';
import { InputTextModule } from 'primeng/inputtext';
import { InputErrorMessage } from '@/shared/components/input-error-message/input-error-message';
import { AdminCarsService } from '../../services/cars.service';

@Component({
  selector: 'app-admin-car-form',
  imports: [TranslatePipe, ReactiveFormsModule, RouterLink, InputErrorMessage, InputTextModule],
  templateUrl: './car-form.html',
  styleUrl: './car-form.css',
})
export class AdminCarForm {
  private formBuilder = inject(FormBuilder);
  private route = inject(ActivatedRoute);
  private router = inject(Router);
  private carsService = inject(AdminCarsService);
  private messageService = inject(MessageService);
  private destroyRef = inject(DestroyRef);

  protected carId: number | null = null;
  protected loading = true;
  protected saving = false;
  protected isCreate = true;

  protected carForm = this.formBuilder.nonNullable.group({
    name: ['', Validators.required],
    brand: ['', Validators.required],
    model: ['', Validators.required],
    kilometers: [0, [Validators.required, Validators.min(0)]],
    price_per_day: [0, [Validators.required, Validators.min(0)]],
  });

  ngOnInit() {
    this.route.paramMap.pipe(takeUntilDestroyed(this.destroyRef)).subscribe((params) => {
      const idParam = params.get('id');

      if (idParam === 'new') {
        this.isCreate = true;
        this.carId = null;
        this.loading = false;
        this.carForm.reset({ name: '', brand: '', model: '', kilometers: 0, price_per_day: 0 });
        return;
      }

      const carId = Number(idParam);
      if (!carId) {
        this.loading = false;
        return;
      }

      this.isCreate = false;
      this.carId = carId;
      this.loadCar(carId);
    });
  }

  protected onSubmit() {
    if (this.carForm.invalid) {
      this.carForm.markAllAsTouched();
      return;
    }

    this.saving = true;
    const payload = this.carForm.getRawValue();

    if (this.isCreate) {
      this.carsService.create(payload).subscribe({
        next: () => {
          this.messageService.add({
            severity: 'success',
            summary: 'Created',
            detail: 'Car created successfully.',
          });
          void this.router.navigateByUrl('/admin/cars');
        },
        error: () => {
          this.saving = false;
          this.messageService.add({
            severity: 'error',
            summary: 'Error',
            detail: 'Failed to create car.',
          });
        },
      });
    } else if (this.carId) {
      this.carsService.update(this.carId, payload).subscribe({
        next: () => {
          this.messageService.add({
            severity: 'success',
            summary: 'Updated',
            detail: 'Car updated successfully.',
          });
          void this.router.navigateByUrl('/admin/cars');
        },
        error: () => {
          this.saving = false;
          this.messageService.add({
            severity: 'error',
            summary: 'Error',
            detail: 'Failed to update car.',
          });
        },
      });
    }
  }

  private loadCar(carId: number) {
    this.loading = true;

    this.carsService.show(carId).subscribe({
      next: (car) => {
        this.carForm.patchValue({
          name: car.name,
          brand: car.brand,
          model: car.model,
          kilometers: car.kilometers,
          price_per_day: typeof car.price_per_day === 'string' ? Number(car.price_per_day) : car.price_per_day,
        });
      },
      error: () => {
        this.messageService.add({
          severity: 'error',
          summary: 'Error',
          detail: 'Failed to load car details.',
        });
        this.loading = false;
      },
      complete: () => {
        this.loading = false;
      },
    });
  }
}
