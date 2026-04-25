import { ValidationErrorKey, ValidationErrors } from '@/core/constants/validation-errors';
import { Component, inject, input } from '@angular/core';
import { AbstractControl } from '@angular/forms';
import { Message } from 'primeng/message';
import { InputGroupModule } from 'primeng/inputgroup';
import { UiPreferencesService } from '@/core/services/ui-preferences.service';

@Component({
  selector: 'app-input-error-message',
  imports: [Message, InputGroupModule],
  templateUrl: './input-error-message.html',
  styleUrl: './input-error-message.css',
})
export class InputErrorMessage {
  fc = input<AbstractControl | null>(null);
  private uiPreferences = inject(UiPreferencesService);

  getErrorMessage() {
    let error = '';
    if (this.fc()?.errors) {
      let key = Object.keys(this.fc()?.errors!)[0] as ValidationErrorKey;
      const method = ValidationErrors[key];
      const lang = this.uiPreferences.language();
      error = method(this.fc()?.errors![key])[lang];
    }
    return error;
  }
}
