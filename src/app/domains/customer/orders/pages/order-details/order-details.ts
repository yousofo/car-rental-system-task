import { DatePipe } from '@angular/common';
import { Component, DestroyRef, inject } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { TranslatePipe } from '@ngx-translate/core';
import { CustomerOrdersService } from '../../services/orders.service';
import { CustomerOrder } from '../../services/order.mapper';

@Component({
  selector: 'app-order-details',
  imports: [RouterLink, TranslatePipe, DatePipe],
  templateUrl: './order-details.html',
  styleUrl: './order-details.css',
})
export class OrderDetails {
  private route = inject(ActivatedRoute);
  private ordersService = inject(CustomerOrdersService);
  private destroyRef = inject(DestroyRef);

  protected order: CustomerOrder | null = null;
  protected loading = true;
  protected failed = false;

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

  private loadOrder(orderId: number) {
    this.loading = true;
    this.failed = false;

    this.ordersService.show(orderId).subscribe({
      next: (order) => {
        this.order = order;
      },
      error: () => {
        this.failed = true;
        this.order = null;
        this.loading = false;
      },
      complete: () => {
        this.loading = false;
      },
    });
  }
}
