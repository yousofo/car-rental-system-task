import { Component, DestroyRef, inject } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { TranslatePipe } from '@ngx-translate/core';
import { OrderDto } from '@/shared/api-models/api.models';
import { cleanQuery } from '@/core/utils/helpers';
import { InputTextModule } from 'primeng/inputtext';
import { PaginatorModule } from 'primeng/paginator';
import { SelectModule } from 'primeng/select';
import { AdminOrdersService } from '../../services/orders.service';
import { AdminOrdersQueryDto } from '../../api/orders.dto';

interface OrdersFiltersFormValue {
  search: string;
  user_id: string;
  car_id: string;
  payment_type: string;
  payment_status: string;
  order_type: string;
  per_page: string;
}

@Component({
  selector: 'app-admin-orders-list',
  imports: [TranslatePipe, ReactiveFormsModule, RouterLink, PaginatorModule, InputTextModule, SelectModule],
  templateUrl: './orders-list.html',
  styleUrl: './orders-list.css',
})
export class AdminOrdersList {
  private formBuilder = inject(FormBuilder);
  private route = inject(ActivatedRoute);
  private router = inject(Router);
  private ordersService = inject(AdminOrdersService);
  private destroyRef = inject(DestroyRef);

  protected filtersForm = this.formBuilder.nonNullable.group({
    search: '',
    user_id: '',
    car_id: '',
    payment_type: '',
    payment_status: '',
    order_type: '',
    per_page: '10',
  });

  protected orders: OrderDto[] = [];
  protected loading = true;
  protected totalOrders = 0;
  protected currentPage = 1;
  protected lastPage = 1;
  protected rows = 10;
  protected activeFiltersCount = 0;

  protected paymentTypeOptions = [
    { label: 'CUSTOMER_ORDERS.PAYMENT_TYPES.CASH', value: 'cash' },
    { label: 'CUSTOMER_ORDERS.PAYMENT_TYPES.VISA', value: 'visa' },
    { label: 'CUSTOMER_ORDERS.PAYMENT_TYPES.TAMARA', value: 'tamara' },
  ];

  protected paymentStatusOptions = [
    { label: 'CUSTOMER_ORDERS.PAYMENT_STATUS_VALUES.PENDING', value: 'pending' },
    { label: 'CUSTOMER_ORDERS.PAYMENT_STATUS_VALUES.SUCCESS', value: 'success' },
  ];

  protected orderTypeOptions = [
    { label: 'CUSTOMER_ORDERS.ORDER_TYPES.FULL', value: 'full' },
    { label: 'CUSTOMER_ORDERS.ORDER_TYPES.INSTALLMENTS', value: 'installments' },
  ];

  protected perPageOptions = [
    { label: '10', value: '10' },
    { label: '25', value: '25' },
    { label: '50', value: '50' },
  ];

  ngOnInit() {
    this.route.queryParamMap.pipe(takeUntilDestroyed(this.destroyRef)).subscribe((params) => {
      const filters = {
        search: params.get('search') ?? '',
        user_id: params.get('user_id') ?? '',
        car_id: params.get('car_id') ?? '',
        payment_type: params.get('payment_type') ?? '',
        payment_status: params.get('payment_status') ?? '',
        order_type: params.get('order_type') ?? '',
        per_page: params.get('per_page') ?? '10',
      };
      const page = Number(params.get('page') ?? '1');

      this.filtersForm.patchValue(filters, { emitEvent: false });
      this.loadOrders(this.normalizeQuery(filters), page);
    });
  }

  protected applyFilters() {
    void this.router.navigate([], {
      relativeTo: this.route,
      queryParams: { ...this.normalizeQuery(this.filtersForm.getRawValue()), page: 1 },
    });
  }

  protected resetFilters() {
    this.filtersForm.setValue({
      search: '',
      user_id: '',
      car_id: '',
      payment_type: '',
      payment_status: '',
      order_type: '',
      per_page: '10',
    });
    void this.router.navigate([], {
      relativeTo: this.route,
      queryParams: { per_page: 10, page: 1 },
    });
  }

  protected onPageChange(event: { page?: number; rows?: number; first?: number }) {
    void this.router.navigate([], {
      relativeTo: this.route,
      queryParams: { page: (event.page ?? 0) + 1, per_page: event.rows },
      queryParamsHandling: 'merge',
    });
  }

  private loadOrders(query: AdminOrdersQueryDto, page: number) {
    this.loading = true;

    this.ordersService.list({ ...query, page }).subscribe({
      next: (response) => {
        this.orders = response.data;
        this.totalOrders = response.total;
        this.currentPage = response.current_page;
        this.lastPage = response.last_page;
        this.rows = response.per_page;
        this.activeFiltersCount = this.countActiveFilters(query);
      },
      error: () => {
        this.orders = [];
        this.totalOrders = 0;
        this.currentPage = 1;
        this.lastPage = 1;
        this.rows = 10;
        this.activeFiltersCount = 0;
        this.loading = false;
      },
      complete: () => {
        this.loading = false;
      },
    });
  }

  private normalizeQuery(rawValue: OrdersFiltersFormValue): AdminOrdersQueryDto {
    return cleanQuery({
      search: rawValue.search || undefined,
      user_id: rawValue.user_id ? Number(rawValue.user_id) : undefined,
      car_id: rawValue.car_id ? Number(rawValue.car_id) : undefined,
      payment_type: rawValue.payment_type || undefined,
      payment_status: rawValue.payment_status || undefined,
      order_type: rawValue.order_type || undefined,
      per_page: rawValue.per_page ? Number(rawValue.per_page) : undefined,
    });
  }

  private countActiveFilters(query: AdminOrdersQueryDto) {
    return [query['search'], query['user_id'], query['car_id'], query['payment_type'], query['payment_status'], query['order_type']].filter(
      Boolean
    ).length;
  }
}
