import { Component, computed, inject, signal } from '@angular/core';
import { Router, RouterLink, RouterLinkActive } from '@angular/router';
import { TranslatePipe } from '@ngx-translate/core';
import { finalize } from 'rxjs';
import { AuthService } from '@/core/services/auth-service';
import { UiPreferencesService } from '@/core/services/ui-preferences.service';
import { CustomerAuthService } from '@/domains/customer/auth/services/customer-auth.service';
import { AdminAuthService } from '@/domains/admin/auth/services/auth.service';

@Component({
  selector: 'app-shared-header',
  imports: [RouterLink, RouterLinkActive, TranslatePipe],
  templateUrl: './shared-header.html',
  styleUrl: './shared-header.css',
})
export class SharedHeader {
  private router = inject(Router);
  private customerAuthService = inject(CustomerAuthService);
  private adminAuthService = inject(AdminAuthService);
  protected authService = inject(AuthService);
  protected uiPreferences = inject(UiPreferencesService);
  protected menuOpen = signal(false);

  protected navLinks = computed(() => {
    if (this.authService.userRole() === 'admin') {
      return [
        { label: 'HEADER.ADMIN_HOME', path: '/admin', exact: true },
        { label: 'HEADER.CARS', path: '/admin/cars', exact: false },
        { label: 'HEADER.ORDERS', path: '/admin/orders', exact: false },
        { label: 'HEADER.USERS', path: '/admin/users', exact: false },
      ];
    }

    if (this.authService.userRole() === 'customer') {
      return [
        { label: 'HEADER.CARS', path: '/cars', exact: false },
        { label: 'HEADER.ORDERS', path: '/orders', exact: false },
        { label: 'HEADER.INSTALLMENTS', path: '/installments', exact: false },
      ];
    }

    return [];
  });

  protected closeMenu() {
    this.menuOpen.set(false);
  }

  protected logout() {
    const role = this.authService.userRole();

    if (!role) {
      this.authService.clearSession();
      void this.router.navigateByUrl('/');
      return;
    }

    const request = role === 'admin' ? this.adminAuthService.logout() : this.customerAuthService.logout();

    request
      .pipe(
        finalize(() => {
          this.authService.clearSession();
          void this.router.navigateByUrl('/');
        }),
      )
      .subscribe({
        error: () => {
          // Session cleanup happens in finalize even if the backend rejects logout.
        },
      });
  }
}
