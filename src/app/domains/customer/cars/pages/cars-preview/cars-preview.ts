import { Component, DestroyRef, inject } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { TranslatePipe } from '@ngx-translate/core';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { Skeleton } from 'primeng/skeleton';
import { PaginatorModule } from 'primeng/paginator';
import { CustomerCarsService } from '../../services/cars.service';
import { CustomerCar } from '../../services/car.mapper';
import { CustomerCarsQueryDto } from '../../api/cars.dto';
import { cleanQuery } from '@/core/utils/helpers';

interface CarsFiltersFormValue {
  search: string;
  brand: string;
  min_price: string;
  max_price: string;
}

@Component({
  selector: 'app-cars-preview',
  imports: [TranslatePipe, Skeleton, ReactiveFormsModule, RouterLink, PaginatorModule, InputTextModule, ButtonModule],
  templateUrl: './cars-preview.html',
  styleUrl: './cars-preview.css',
})
export class CarsPreview {
  private formBuilder = inject(FormBuilder);
  private route = inject(ActivatedRoute);
  private router = inject(Router);
  private carsService = inject(CustomerCarsService);
  private destroyRef = inject(DestroyRef);

  protected filtersForm = this.formBuilder.nonNullable.group({
    search: '',
    brand: '',
    min_price: '',
    max_price: '',
  });

  protected cars: CustomerCar[] = [];
  protected brands: string[] = [];
  protected loading = true;
  protected totalCars = 0;
  protected activeFiltersCount = 0;
  protected skeletonCards = Array.from({ length: 6 });
  protected currentPage = 1;
  protected rows = 6;

  ngOnInit() {
    this.route.queryParamMap.pipe(takeUntilDestroyed(this.destroyRef)).subscribe((params) => {
      const filters = {
        search: params.get('search') ?? '',
        brand: params.get('brand') ?? '',
        min_price: params.get('min_price') ?? '',
        max_price: params.get('max_price') ?? '',
      };

      const page = Number(params.get('page') ?? '1');
      this.rows = Number(params.get('per_page') ?? '6');

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
      queryParams: {
        page: 1,
      },
    });
  }

  protected onPageChange(event: { page?: number; rows?: number; first?: number }) {
    void this.router.navigate([], {
      relativeTo: this.route,
      queryParams: { page: (event.page ?? 0) + 1, per_page: event.rows },
      queryParamsHandling: 'merge',
    });
  }

  private loadCars(query: CustomerCarsQueryDto, page = 1) {
    this.loading = true;

    this.carsService.list({ ...query, page, per_page: this.rows }).subscribe({
      next: (response) => {
        this.cars = response.data;
        this.totalCars = response.total;
        this.currentPage = response.current_page;
        this.rows = response.per_page;
        this.brands = Array.from(new Set(response.data.map((car) => car.brand))).sort((left, right) => left.localeCompare(right));
        this.activeFiltersCount = this.countActiveFilters(query);
      },
      error: () => {
        this.cars = [];
        this.totalCars = 0;
        this.activeFiltersCount = 0;
        this.currentPage = 1;
        this.rows = 6;
        this.loading = false;
      },
      complete: () => {
        this.loading = false;
      },
    });
  }

  private normalizeQuery(rawValue: CarsFiltersFormValue): CustomerCarsQueryDto {
    return cleanQuery({
      search: rawValue.search || undefined,
      brand: rawValue.brand || undefined,
      min_price: rawValue.min_price ? Number(rawValue.min_price) : undefined,
      max_price: rawValue.max_price ? Number(rawValue.max_price) : undefined,
    });
  }

  private countActiveFilters(query: CustomerCarsQueryDto) {
    return [query.search, query.brand, query.min_price, query.max_price].filter(Boolean).length;
  }
}
