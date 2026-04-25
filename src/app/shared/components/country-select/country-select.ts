import { Component, computed, effect, forwardRef } from '@angular/core';
import { ControlValueAccessor, FormsModule, NG_VALUE_ACCESSOR } from '@angular/forms';
import { BaseComponent } from '../base-component';
import { SelectModule } from 'primeng/select';
import { TranslatePipe } from '@ngx-translate/core';
import * as countriesLib from 'i18n-iso-countries';
// Register necessary languages
import localeEn from 'i18n-iso-countries/langs/en.json';
import localeAr from 'i18n-iso-countries/langs/ar.json';
countriesLib.registerLocale(localeEn);
countriesLib.registerLocale(localeAr);

@Component({
  selector: 'app-country-select',
  imports: [SelectModule, TranslatePipe, FormsModule],
  templateUrl: './country-select.html',
  styleUrl: './country-select.css',
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => CountrySelect),
      multi: true,
    },
  ],
})
export class CountrySelect extends BaseComponent implements ControlValueAccessor {
  protected readonly lang = computed(() => this.uiPreferences.language());

  countries: {
    code: string;
    displayName: string;
    searchEn: string;
    searchAr: string;
    englishName: string;
  }[] = [];
  selectedCode: string | null | undefined = null; // We track the ISO code internally

  // ControlValueAccessor Boilerplate
  onChange: any = () => {};
  onTouched: any = () => {};

  constructor() {
    super();

    effect(() => {
      this.lang();
      this.buildCountries();
    });
  }

  // When user picks a country
  onDropdownChange(event: any) {
    const country = this.countries.find((c) => c.code === event.value);
    // Send the English Name to the parent form
    this.onChange(country ? country.englishName : null);
    this.onTouched();
  }

  // Required CVA methods

  // When form sets value (the English Name from backend)
  writeValue(englishName: string): void {
    if (englishName) {
      // Find the code by the English name
      this.selectedCode = countriesLib.getAlpha2Code(englishName, 'en');
    } else {
      this.selectedCode = null;
    }
  }

  registerOnChange(fn: any): void {
    this.onChange = fn;
  }
  registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }

  getEmoji(code: string) {
    return code.toUpperCase().replace(/./g, char => 
      String.fromCodePoint(char.charCodeAt(0) + 127397)
    );
  }

  private buildCountries() {
    const enNames = countriesLib.getNames('en', { select: 'official' });
    const arNames = countriesLib.getNames('ar', { select: 'official' });

    this.countries = Object.entries(enNames).map(([code, enName]) => ({
      displayName: this.lang() === 'ar' ? arNames[code] : enName,
      searchEn: enName.toLowerCase(),
      searchAr: arNames[code],
      englishName: enName,
      code: code,
    }));
  }
}
