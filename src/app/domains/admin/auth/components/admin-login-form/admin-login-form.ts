import { Component, inject, signal } from '@angular/core';
import { Router } from '@angular/router';
import { ReactiveFormsModule, Validators } from '@angular/forms';
import { TranslatePipe } from '@ngx-translate/core';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { PasswordModule } from 'primeng/password';
import { emailValidator } from '@/core/utils/text-validators';
import { BaseComponent } from '@/shared/components/base-component';
import { InputErrorMessage } from '@/shared/components/input-error-message/input-error-message';
import { AdminAuthService } from '../../services/auth.service';

@Component({
  selector: 'app-admin-login-form',
  imports: [ReactiveFormsModule, InputErrorMessage, PasswordModule, ButtonModule, InputTextModule, TranslatePipe],
  templateUrl: './admin-login-form.html',
  styleUrl: './admin-login-form.css',
})
export class AdminLoginForm extends BaseComponent {
  private adminAuthService = inject(AdminAuthService);
  private router = inject(Router);

  fg = this.fb.group({
    email: this.fb.control('', [Validators.required, Validators.email, emailValidator]),
    password: this.fb.control('', [Validators.required]),
  });

  rememberLogin = false;
  isSubmitting = signal(false);
  backendError = signal<string | null>(null);

  onSubmit() {
    if (this.fg.invalid) {
      this.fg.markAllAsTouched();
      return;
    }

    this.backendError.set(null);
    this.isSubmitting.set(true);
    this.adminAuthService.login(this.fg.getRawValue(), this.rememberLogin).subscribe({
      next: () => {
        this.messageService.add({
          severity: 'success',
          summary: this.translateService.instant('MESSAGES.LOGIN_SUCCESS_TITLE'),
          detail: this.translateService.instant('MESSAGES.ADMIN_LOGIN_SUCCESS_DETAIL'),
        });
        this.isSubmitting.set(false);
        void this.router.navigateByUrl('/admin');
      },
      error: (err) => {
        this.isSubmitting.set(false);
        const msg = err?.error?.message || err?.message || this.translateService.instant('ERRORS.INVALID_REQUEST');
        this.backendError.set(msg);
      },
    });
  }
}
