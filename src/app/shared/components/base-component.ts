import { inject } from "@angular/core";
import { FormBuilder } from "@angular/forms";
import { TranslateService } from "@ngx-translate/core";
import { MessageService } from "primeng/api";
import { UiPreferencesService } from "@/core/services/ui-preferences.service";

export class BaseComponent {
  private _fb = inject(FormBuilder);
  fb = this._fb.nonNullable

  messageService = inject(MessageService);
  translateService = inject(TranslateService);
  uiPreferences = inject(UiPreferencesService);
}
