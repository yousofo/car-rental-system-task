import { Component, signal } from '@angular/core';
import { CustomerRegisterForm } from '@/domains/customer/auth/components/customer-register-form/customer-register-form';
import { AdminRegisterForm } from '@/domains/admin/auth/components/admin-register-form/admin-register-form';
import { TranslatePipe } from '@ngx-translate/core';
import { RouterLink } from '@angular/router';
import { SharedHeader } from '@/shared/components/shared-header/shared-header';

@Component({
  selector: 'app-register',
  imports: [CustomerRegisterForm, AdminRegisterForm, TranslatePipe, RouterLink, SharedHeader],
  templateUrl: './register.html',
  styleUrl: './register.css',
})
export class Register {
  role = signal<'customer' | 'admin'>('customer');
}
