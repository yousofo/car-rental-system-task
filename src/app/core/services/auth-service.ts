import { computed, Injectable, signal } from '@angular/core';
import { getItem, getStorageItem, removeItem, removeStorageItem, setItem, setStorageItem } from '../utils/localstorage';
import { LocalstorageKeys } from '../constants/localstorage-keys';
import { UserDto, UserRole } from '@/shared/api-models/api.models';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  bearerToken = signal<string | null>(this.getStoredValue(LocalstorageKeys.BEARER_TOKEN));
  userDetails = signal<UserDto | null>(this.getStoredValue(LocalstorageKeys.USER_DETAILS));
  userRole = signal<UserRole | null>(this.getStoredValue(LocalstorageKeys.USER_ROLE));

  //requires: token + details
  isAuthenticated = computed(() => this.bearerToken() && this.userDetails());

  setSession(token: string, user: UserDto, role: UserRole, remember = true) {
    const targetStorage = remember ? localStorage : sessionStorage;
    const staleStorage = remember ? sessionStorage : localStorage;

    setStorageItem(targetStorage, LocalstorageKeys.BEARER_TOKEN, token);
    setStorageItem(targetStorage, LocalstorageKeys.USER_DETAILS, user);
    setStorageItem(targetStorage, LocalstorageKeys.USER_ROLE, role);

    removeStorageItem(staleStorage, LocalstorageKeys.BEARER_TOKEN);
    removeStorageItem(staleStorage, LocalstorageKeys.USER_DETAILS);
    removeStorageItem(staleStorage, LocalstorageKeys.USER_ROLE);

    this.bearerToken.set(token);
    this.userDetails.set(user);
    this.userRole.set(role);
  }

  clearSession() {
    removeItem(LocalstorageKeys.BEARER_TOKEN);
    removeItem(LocalstorageKeys.USER_DETAILS);
    removeItem(LocalstorageKeys.USER_ROLE);

    removeStorageItem(sessionStorage, LocalstorageKeys.BEARER_TOKEN);
    removeStorageItem(sessionStorage, LocalstorageKeys.USER_DETAILS);
    removeStorageItem(sessionStorage, LocalstorageKeys.USER_ROLE);

    this.bearerToken.set(null);
    this.userDetails.set(null);
    this.userRole.set(null);
  }

  private getStoredValue<T extends LocalstorageKeys>(key: T) {
    return getItem(key) ?? getStorageItem(sessionStorage, key);
  }
}
