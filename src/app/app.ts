import { Component, effect, inject, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { ProgressBar } from 'primeng/progressbar';
import { ToastModule } from 'primeng/toast';
import { LoadingService } from './core/services/loading-service';
import { UiPreferencesService } from './core/services/ui-preferences.service';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, ProgressBar, ToastModule],
  templateUrl: './app.html',
  styleUrl: './app.css',
})
export class App {
  protected readonly title = signal('car-rental-system-task');
  protected loadingService = inject(LoadingService);
  private uiPreferences = inject(UiPreferencesService);

  constructor() {
    this.uiPreferences.initialize();
    effect(() => {
      const isLoading = this.loadingService.isLoading();
      document.documentElement.classList.toggle('app-loading', isLoading);
      document.body.style.cursor = isLoading ? 'progress' : '';
    });
  }
}
