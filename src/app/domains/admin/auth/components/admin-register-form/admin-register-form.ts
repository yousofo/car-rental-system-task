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
import { AdminAuthService } from '../../services/auth.service';

@Component({
  selector: 'app-admin-register-form',
  imports: [ReactiveFormsModule, InputErrorMessage, Password, InputText, Button, TranslatePipe, CountrySelect],
  templateUrl: './admin-register-form.html',
  styleUrl: './admin-register-form.css',
})
export class AdminRegisterForm extends BaseComponent {
  private adminAuthService = inject(AdminAuthService);
  private router = inject(Router);

  fg = this.fb.group({
    name: this.fb.control('', [Validators.required, Validators.minLength(3), onlyLettersAllowed]),
    email: this.fb.control('', [Validators.required, Validators.email, emailValidator]),
    phone: this.fb.control('', [Validators.required, Validators.minLength(8)]),
    country: this.fb.control('', [Validators.required]),
    password: this.fb.control('', [Validators.required, Validators.minLength(8)]),
    password_confirmation: this.fb.control('', [Validators.required, matchControlValidator('password')]),
  });

  isSubmitting = signal(false);

  onSubmit() {
    if (this.fg.invalid) {
      this.fg.markAllAsTouched();
      return;
    }

    this.isSubmitting.set(true);
    this.adminAuthService.register(this.fg.getRawValue()).subscribe({
      next: () => {
        this.messageService.add({
          severity: 'success',
          summary: this.translateService.instant('MESSAGES.REGISTRATION_SUCCESS_TITLE'),
          detail: this.translateService.instant('MESSAGES.ADMIN_REGISTER_SUCCESS_DETAIL'),
        });
        this.isSubmitting.set(false);
        void this.router.navigateByUrl('/admin');
      },
      error: () => {
        this.isSubmitting.set(false);
      },
    });
  }
}
