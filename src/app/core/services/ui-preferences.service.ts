import { Injectable, inject, signal } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { LocalstorageKeys } from '../constants/localstorage-keys';
import { getItem, setItem } from '../utils/localstorage';
import { firstValueFrom } from 'rxjs';

export type AppLanguage = 'ar' | 'en';
export type AppTheme = 'light' | 'dark';

@Injectable({
  providedIn: 'root',
})
export class UiPreferencesService {
  private translate = inject(TranslateService);

  language = signal<AppLanguage>(getItem(LocalstorageKeys.LANGUAGE) ?? 'ar');
  theme = signal<AppTheme>(getItem(LocalstorageKeys.THEME) ?? 'light');

  initialize() {
    this.translate.addLangs(['ar', 'en']);
    this.translate.setDefaultLang('ar');
    this.translate.setFallbackLang('ar');
    void this.activateLanguage(this.language());
    this.applyDocumentLanguage(this.language());
    this.applyTheme(this.theme());
  }

  setLanguage(language: AppLanguage) {
    this.language.set(language);
    setItem(LocalstorageKeys.LANGUAGE, language);
    void this.activateLanguage(language);
    this.applyDocumentLanguage(language);
  }

  toggleLanguage() {
    this.setLanguage(this.language() === 'ar' ? 'en' : 'ar');
  }

  setTheme(theme: AppTheme) {
    this.theme.set(theme);
    setItem(LocalstorageKeys.THEME, theme);
    this.applyTheme(theme);
  }

  toggleTheme() {
    this.setTheme(this.theme() === 'dark' ? 'light' : 'dark');
  }

  private applyTheme(theme: AppTheme) {
    document.documentElement.classList.toggle('app-dark', theme === 'dark');
  }

  private applyDocumentLanguage(language: AppLanguage) {
    document.documentElement.lang = language;
    document.documentElement.dir = language === 'ar' ? 'rtl' : 'ltr';
  }

  private async activateLanguage(language: AppLanguage) {
    await firstValueFrom(this.translate.use(language));
  }
}
