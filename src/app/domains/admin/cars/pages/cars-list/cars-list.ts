import { Component, DestroyRef, inject } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { TranslatePipe } from '@ngx-translate/core';
import { MessageService } from 'primeng/api';
import { CarDto } from '@/shared/api-models/api.models';
import { cleanQuery } from '@/core/utils/helpers';
import { InputTextModule } from 'primeng/inputtext';
import { PaginatorModule } from 'primeng/paginator';
import { AdminCarsService } from '../../services/cars.service';
import { AdminCarsQueryDto } from '../../api/cars.dto';

interface CarsFiltersFormValue {
  search: string;
  brand: string;
  min_price: string;
  max_price: string;
}

@Component({
  selector: 'app-admin-cars-list',
  imports: [TranslatePipe, ReactiveFormsModule, RouterLink, PaginatorModule, InputTextModule],
  templateUrl: './cars-list.html',
  styleUrl: './cars-list.css',
})
export class AdminCarsList {
  private formBuilder = inject(FormBuilder);
  private route = inject(ActivatedRoute);
  private router = inject(Router);
  private carsService = inject(AdminCarsService);
  private messageService = inject(MessageService);
  private destroyRef = inject(DestroyRef);

  protected filtersForm = this.formBuilder.nonNullable.group({
    search: '',
    brand: '',
    min_price: '',
    max_price: '',
  });

  protected cars: CarDto[] = [];
  protected loading = true;
  protected totalCars = 0;
  protected currentPage = 1;
  protected lastPage = 1;
  protected rows = 10;
  protected activeFiltersCount = 0;

  ngOnInit() {
    this.route.queryParamMap.pipe(takeUntilDestroyed(this.destroyRef)).subscribe((params) => {
      const filters = {
        search: params.get('search') ?? '',
        brand: params.get('brand') ?? '',
        min_price: params.get('min_price') ?? '',
        max_price: params.get('max_price') ?? '',
      };
      const page = Number(params.get('page') ?? '1');
      this.rows = Number(params.get('per_page') ?? '10');

      this.filtersForm.patchValue(filters, { emitEvent: false });
      this.loadCars(this.normalizeQuery(filters), page);
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
      brand: '',
      min_price: '',
      max_price: '',
    });
    void this.router.navigate([], {
      relativeTo: this.route,
      queryParams: { page: 1 },
    });
  }

  protected onPageChange(event: { page?: number; rows?: number; first?: number }) {
    void this.router.navigate([], {
      relativeTo: this.route,
      queryParams: { page: (event.page ?? 0) + 1, per_page: event.rows },
      queryParamsHandling: 'merge',
    });
  }

  protected deleteCar(car: CarDto) {
    const confirmed = window.confirm(`Delete ${car.name}?`);
    if (!confirmed) return;

    this.carsService.delete(car.id).subscribe({
      next: () => {
        this.messageService.add({
          severity: 'success',
          summary: 'Deleted',
          detail: `${car.name} deleted successfully.`,
        });
        this.loadCars(this.normalizeQuery(this.filtersForm.getRawValue()), this.currentPage);
      },
      error: () => {
        this.messageService.add({
          severity: 'error',
          summary: 'Error',
          detail: `Failed to delete ${car.name}.`,
        });
      },
    });
  }

  private loadCars(query: AdminCarsQueryDto, page: number) {
    this.loading = true;

    this.carsService.list({ ...query, page, per_page: this.rows }).subscribe({
      next: (response) => {
        this.cars = response.data;
        this.totalCars = response.total;
        this.currentPage = response.current_page;
        this.lastPage = response.last_page;
        this.rows = response.per_page;
        this.activeFiltersCount = this.countActiveFilters(query);
      },
      error: () => {
        this.cars = [];
        this.totalCars = 0;
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

  private normalizeQuery(rawValue: CarsFiltersFormValue): AdminCarsQueryDto {
    return cleanQuery({
      search: rawValue.search || undefined,
      brand: rawValue.brand || undefined,
      min_price: rawValue.min_price ? Number(rawValue.min_price) : undefined,
      max_price: rawValue.max_price ? Number(rawValue.max_price) : undefined,
    });
  }

  private countActiveFilters(query: AdminCarsQueryDto) {
    return [query['search'], query['brand'], query['min_price'], query['max_price']].filter(Boolean).length;
  }
}
