import { DatePipe } from '@angular/common';
import { Component, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { TranslatePipe } from '@ngx-translate/core';
import { CustomerOrdersService } from '../../services/orders.service';
import { CustomerOrder } from '../../services/order.mapper';

@Component({
  selector: 'app-orders-list',
  imports: [RouterLink, TranslatePipe, DatePipe],
  templateUrl: './orders-list.html',
  styleUrl: './orders-list.css',
})
export class OrdersList {
  private ordersService = inject(CustomerOrdersService);

  protected orders: CustomerOrder[] = [];
  protected loading = true;

  ngOnInit() {
    this.ordersService.list({ per_page: 12 }).subscribe({
      next: (response) => {
        this.orders = response.data;
      },
      error: () => {
        this.orders = [];
        this.loading = false;
      },
      complete: () => {
        this.loading = false;
      },
    });
  }
}
