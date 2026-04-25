import { Component, inject, signal } from '@angular/core';
import { Router } from '@angular/router';
import { ReactiveFormsModule, Validators } from '@angular/forms';
import { TranslatePipe } from '@ngx-translate/core';
import { Button } from 'primeng/button';
import { InputText } from 'primeng/inputtext';
import { Password } from 'primeng/password';
import { emailValidator, matchControlValidator, onlyLettersAllowed } from '@/core/utils/text-validators';
import { BaseComponent } from '@/shared/components/base-component';
import { CountrySelect } from '@/shared/components/country-select/country-select';
import { InputErrorMessage } from '@/shared/components/input-error-message/input-error-message';
import { CustomerAuthService } from '../../services/customer-auth.service';

@Component({
  selector: 'app-customer-register-form',
  imports: [InputErrorMessage, Password, InputText, ReactiveFormsModule, Button, TranslatePipe, CountrySelect],
  templateUrl: './customer-register-form.html',
  styleUrl: './customer-register-form.css',
})
export class CustomerRegisterForm extends BaseComponent {
  private customerAuthService = inject(CustomerAuthService);
  private router = inject(Router);

  fg = this.fb.group({
    name: this.fb.control('', [Validators.required, Validators.minLength(3), onlyLettersAllowed]),
    email: this.fb.control('', [Validators.required, Validators.email, emailValidator]),
    password: this.fb.control('', [Validators.required, Validators.minLength(8)]),
    password_confirmation: this.fb.control('', [Validators.required, matchControlValidator('password')]),
    phone: this.fb.control('', [Validators.required, Validators.minLength(8)]),
    country: this.fb.control('', [Validators.required]),
  });

  rememberLogin = false;
  isSubmitting = signal(false);

  onSubmit() {
    if (this.fg.invalid) {
      this.fg.markAllAsTouched();
      return;
    }

    this.isSubmitting.set(true);
    this.customerAuthService.register(this.fg.getRawValue()).subscribe({
      next: () => {
        this.messageService.add({
          severity: 'success',
          summary: this.translateService.instant('MESSAGES.REGISTRATION_SUCCESS_TITLE'),
          detail: this.translateService.instant('MESSAGES.CUSTOMER_REGISTER_SUCCESS_DETAIL'),
        });
        this.isSubmitting.set(false);
        void this.router.navigateByUrl('/cars');
      },
      error: () => {
        this.isSubmitting.set(false);
      },
    });
  }
}
