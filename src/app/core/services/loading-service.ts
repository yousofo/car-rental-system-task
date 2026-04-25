import { computed, Injectable, signal } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class LoadingService {
  loadingItemsCount = signal(0);
  isLoading = computed(() => this.loadingItemsCount() > 0);

  addLoading() {
    this.loadingItemsCount.update((count) => count + 1);
  }

  removeLoading() {
    this.loadingItemsCount.update((count) => Math.max(0, count - 1));
  }
}
