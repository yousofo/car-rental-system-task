import { Component, DestroyRef, inject } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { TranslatePipe } from '@ngx-translate/core';
import { UserDto } from '@/shared/api-models/api.models';
import { cleanQuery } from '@/core/utils/helpers';
import { InputTextModule } from 'primeng/inputtext';
import { PaginatorModule } from 'primeng/paginator';
import { SelectModule } from 'primeng/select';
import { AdminUsersService } from '../../services/users.service';
import { AdminUsersQueryDto } from '../../api/users.dto';

interface UsersFiltersFormValue {
  search: string;
  role: string;
  country: string;
  per_page: string;
}

@Component({
  selector: 'app-admin-users-list',
  imports: [TranslatePipe, ReactiveFormsModule, RouterLink, PaginatorModule, InputTextModule, SelectModule],
  templateUrl: './users-list.html',
  styleUrl: './users-list.css',
})
export class AdminUsersList {
  private formBuilder = inject(FormBuilder);
  private route = inject(ActivatedRoute);
  private router = inject(Router);
  private usersService = inject(AdminUsersService);
  private destroyRef = inject(DestroyRef);

  protected filtersForm = this.formBuilder.nonNullable.group({
    search: '',
    role: '',
    country: '',
    per_page: '10',
  });

  protected users: UserDto[] = [];
  protected loading = true;
  protected totalUsers = 0;
  protected currentPage = 1;
  protected lastPage = 1;
  protected rows = 10;
  protected activeFiltersCount = 0;

  protected roleOptions = [
    { label: 'ADMIN_USERS.ALL_ROLES', value: '' },
    { label: 'ADMIN_USERS.ROLE_ADMIN', value: 'admin' },
    { label: 'ADMIN_USERS.ROLE_CUSTOMER', value: 'customer' },
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
        role: params.get('role') ?? '',
        country: params.get('country') ?? '',
        per_page: params.get('per_page') ?? '10',
      };
      const page = Number(params.get('page') ?? '1');

      this.filtersForm.patchValue(filters, { emitEvent: false });
      this.loadUsers(this.normalizeQuery(filters), page);
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
      role: '',
      country: '',
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

  private loadUsers(query: AdminUsersQueryDto, page: number) {
    this.loading = true;

    this.usersService.list({ ...query, page }).subscribe({
      next: (response) => {
        this.users = response.data;
        this.totalUsers = response.total;
        this.currentPage = response.current_page;
        this.lastPage = response.last_page;
        this.rows = response.per_page;
        this.activeFiltersCount = this.countActiveFilters(query);
      },
      error: () => {
        this.users = [];
        this.totalUsers = 0;
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

  private normalizeQuery(rawValue: UsersFiltersFormValue): AdminUsersQueryDto {
    return cleanQuery({
      search: rawValue.search || undefined,
      role: rawValue.role || undefined,
      country: rawValue.country || undefined,
      per_page: rawValue.per_page ? Number(rawValue.per_page) : undefined,
    });
  }

  private countActiveFilters(query: AdminUsersQueryDto) {
    return [query['search'], query['role'], query['country']].filter(Boolean).length;
  }
}
