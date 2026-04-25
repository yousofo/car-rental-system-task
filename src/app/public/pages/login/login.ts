import { Component, signal } from '@angular/core';
import { CustomerLoginForm } from '@/domains/customer/auth/components/customer-login-form/customer-login-form';
import { AdminLoginForm } from '@/domains/admin/auth/components/admin-login-form/admin-login-form';
import { TranslatePipe } from '@ngx-translate/core';
import { RouterLink } from '@angular/router';
import { SharedHeader } from '@/shared/components/shared-header/shared-header';

@Component({
  selector: 'app-login',
  imports: [CustomerLoginForm, AdminLoginForm, TranslatePipe, RouterLink, SharedHeader],
  templateUrl: './login.html',
  styleUrl: './login.css',
})
export class Login {
  role = signal<'customer' | 'admin'>('customer');
}
