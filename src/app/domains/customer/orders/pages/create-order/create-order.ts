import { Component, DestroyRef, inject } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { AbstractControl, FormBuilder, ReactiveFormsModule, ValidationErrors, ValidatorFn, Validators } from '@angular/forms';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { TranslatePipe } from '@ngx-translate/core';
import { ButtonModule } from 'primeng/button';
import { DatePickerModule } from 'primeng/datepicker';
import { InputTextModule } from 'primeng/inputtext';
import { SelectModule } from 'primeng/select';
import { CustomerCarsService } from '@/domains/customer/cars/services/cars.service';
import { CustomerCar } from '@/domains/customer/cars/services/car.mapper';
import { CustomerOrdersService } from '../../services/orders.service';

function startOfDay(date: Date | string): Date {
  const d = new Date(date);
  d.setHours(0, 0, 0, 0);
  return d;
}

function toYMD(date: Date | string): string {
  const d = new Date(date);
  const y = d.getFullYear();
  const m = String(d.getMonth() + 1).padStart(2, '0');
  const day = String(d.getDate()).padStart(2, '0');
  return `${y}-${m}-${day}`;
}

function minDateValidator(min: Date): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    const value = control.value;
    if (!value) return null;
    return startOfDay(value).getTime() >= startOfDay(min).getTime() ? null : { minDate: true };
  };
}

const dateRangeValidator: ValidatorFn = (control: AbstractControl): ValidationErrors | null => {
  const deliveryDate = control.get('delivery_date')?.value;
  const receivingDate = control.get('receiving_date')?.value;

  if (!deliveryDate || !receivingDate) {
    return null;
  }

  return startOfDay(receivingDate).getTime() > startOfDay(deliveryDate).getTime() ? null : { invalidDateRange: true };
};

@Component({
  selector: 'app-create-order',
  imports: [ReactiveFormsModule, RouterLink, TranslatePipe, InputTextModule, SelectModule, DatePickerModule, ButtonModule],
  templateUrl: './create-order.html',
  styleUrl: './create-order.css',
})
export class CreateOrder {
  private route = inject(ActivatedRoute);
  private router = inject(Router);
  private formBuilder = inject(FormBuilder);
  private carsService = inject(CustomerCarsService);
  private ordersService = inject(CustomerOrdersService);
  private destroyRef = inject(DestroyRef);

  protected car: CustomerCar | null = null;
  protected loading = true;
  protected submitting = false;
  protected requestFailed = false;
  protected readonly paymentTypeOptions = [
    { label: 'CUSTOMER_ORDERS.PAYMENT_TYPES.CASH', value: 'cash' },
    { label: 'CUSTOMER_ORDERS.PAYMENT_TYPES.VISA', value: 'visa' },
    { label: 'CUSTOMER_ORDERS.PAYMENT_TYPES.TAMARA', value: 'tamara' },
  ];

  protected readonly orderTypeOptions = [
    { label: 'CUSTOMER_ORDERS.ORDER_TYPES.FULL', value: 'full' },
    { label: 'CUSTOMER_ORDERS.ORDER_TYPES.INSTALLMENTS', value: 'installments' },
  ];

  protected readonly minDeliveryDate = startOfDay(new Date());

  protected orderForm = this.formBuilder.group(
    {
      delivery_date: ['', [Validators.required, minDateValidator(this.minDeliveryDate)]],
      receiving_date: ['', Validators.required],
      payment_type: this.formBuilder.nonNullable.control<'cash' | 'visa' | 'tamara'>('cash', Validators.required),
      order_type: this.formBuilder.nonNullable.control<'full' | 'installments'>('full', Validators.required),
      down_payment: [null as number | null],
      number_of_installments: [null as number | null],
    },
    { validators: [dateRangeValidator] },
  );

  get minReceivingDate(): Date | null {
    const deliveryDate = this.orderForm.controls.delivery_date.value;
    if (!deliveryDate) return null;
    const d = startOfDay(deliveryDate);
    d.setDate(d.getDate() + 1);
    return d;
  }

  get rentalDays() {
    const deliveryDate = this.orderForm.controls.delivery_date.value;
    const receivingDate = this.orderForm.controls.receiving_date.value;

    if (!deliveryDate || !receivingDate) {
      return 0;
    }

    const start = startOfDay(deliveryDate);
    const end = startOfDay(receivingDate);
    const millisecondsPerDay = 1000 * 60 * 60 * 24;
    const difference = Math.floor((end.getTime() - start.getTime()) / millisecondsPerDay);

    return difference > 0 ? difference : 0;
  }

  get totalPrice() {
    return this.car ? this.rentalDays * this.car.pricePerDay : 0;
  }

  ngOnInit() {
    this.route.paramMap.pipe(takeUntilDestroyed(this.destroyRef)).subscribe((params) => {
      const carId = Number(params.get('carId'));

      if (!carId) {
        this.car = null;
        this.loading = false;
        this.requestFailed = true;
        return;
      }

      this.loadCar(carId);
    });

    this.orderForm.controls.order_type.valueChanges.pipe(takeUntilDestroyed(this.destroyRef)).subscribe((orderType) => {
      const installmentsControl = this.orderForm.controls.number_of_installments;
      const downPaymentControl = this.orderForm.controls.down_payment;

      if (orderType === 'installments') {
        installmentsControl.addValidators([Validators.required, Validators.min(2)]);
        downPaymentControl.addValidators([Validators.min(0)]);
      } else {
        installmentsControl.clearValidators();
        installmentsControl.setValue(null);
        downPaymentControl.clearValidators();
        downPaymentControl.setValue(null);
      }

      installmentsControl.updateValueAndValidity({ emitEvent: false });
      downPaymentControl.updateValueAndValidity({ emitEvent: false });
    });
  }

  protected submit() {
    if (this.orderForm.invalid || !this.car || this.rentalDays <= 0) {
      this.orderForm.markAllAsTouched();
      return;
    }

    this.submitting = true;
    this.requestFailed = false;

    this.ordersService
      .create({
        car_id: this.car.id,
        delivery_date: toYMD(this.orderForm.controls.delivery_date.value!),
        receiving_date: toYMD(this.orderForm.controls.receiving_date.value!),
        payment_type: this.orderForm.controls.payment_type.value,
        order_type: this.orderForm.controls.order_type.value,
        down_payment: this.orderForm.controls.down_payment.value ?? undefined,
        number_of_installments: this.orderForm.controls.number_of_installments.value ?? undefined,
      })
      .subscribe({
        next: (order) => {
          void this.router.navigateByUrl(`/orders/${order.id}`);
        },
        error: () => {
          this.submitting = false;
          this.requestFailed = true;
        },
      });
  }

  private loadCar(carId: number) {
    this.loading = true;
    this.requestFailed = false;

    this.carsService.show(carId).subscribe({
      next: (car) => {
        this.car = car;
      },
      error: () => {
        this.car = null;
        this.requestFailed = true;
        this.loading = false;
      },
      complete: () => {
        this.loading = false;
      },
    });
  }
}
