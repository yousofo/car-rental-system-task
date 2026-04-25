import { DatePipe } from '@angular/common';
import { Component, DestroyRef, inject } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { SelectModule } from 'primeng/select';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { TranslatePipe } from '@ngx-translate/core';
import { MessageService } from 'primeng/api';
import { OrderDto, PaymentStatus } from '@/shared/api-models/api.models';
import { AdminOrdersService } from '../../services/orders.service';

@Component({
  selector: 'app-admin-order-details',
  imports: [RouterLink, TranslatePipe, DatePipe, ReactiveFormsModule, SelectModule],
  templateUrl: './order-details.html',
  styleUrl: './order-details.css',
})
export class AdminOrderDetails {
  private route = inject(ActivatedRoute);
  private ordersService = inject(AdminOrdersService);
  private messageService = inject(MessageService);
  private formBuilder = inject(FormBuilder);
  private destroyRef = inject(DestroyRef);

  protected order: OrderDto | null = null;
  protected loading = true;
  protected failed = false;
  protected saving = false;

  protected paymentStatusOptions = [
    { label: 'CUSTOMER_ORDERS.PAYMENT_STATUS_VALUES.PENDING', value: 'pending' },
    { label: 'CUSTOMER_ORDERS.PAYMENT_STATUS_VALUES.SUCCESS', value: 'success' },
  ];

  protected statusForm = this.formBuilder.nonNullable.group({
    payment_status: this.formBuilder.nonNullable.control<PaymentStatus>('pending', Validators.required),
  });

  ngOnInit() {
    this.route.paramMap.pipe(takeUntilDestroyed(this.destroyRef)).subscribe((params) => {
      const orderId = Number(params.get('id'));

      if (!orderId) {
        this.failed = true;
        this.loading = false;
        this.order = null;
        return;
      }

      this.loadOrder(orderId);
    });
  }

  protected updateStatus() {
    if (!this.order || this.statusForm.invalid) return;

    this.saving = true;
    this.ordersService.updateStatus(this.order.id, { payment_status: this.statusForm.controls.payment_status.value }).subscribe({
      next: (updatedOrder) => {
        this.order = updatedOrder;
        this.messageService.add({
          severity: 'success',
          summary: 'Updated',
          detail: 'Payment status updated successfully.',
        });
      },
      error: () => {
        this.messageService.add({
          severity: 'error',
          summary: 'Error',
          detail: 'Failed to update payment status.',
        });
      },
      complete: () => {
        this.saving = false;
      },
    });
  }

  private loadOrder(orderId: number) {
    this.loading = true;
    this.failed = false;

    this.ordersService.show(orderId).subscribe({
      next: (order) => {
        this.order = order;
        this.statusForm.patchValue({ payment_status: order.payment_status });
      },
      error: () => {
        this.failed = true;
        this.order = null;
        this.loading = false;
        this.messageService.add({
          severity: 'error',
          summary: 'Error',
          detail: 'Failed to load order details.',
        });
      },
      complete: () => {
        this.loading = false;
      },
    });
  }
}
