import { LocalstorageKeys, LocalStorageTypes } from "../constants/localstorage-keys";

type StorageArea = Pick<Storage, 'getItem' | 'setItem' | 'removeItem'>;

export function setItem<K extends LocalstorageKeys>(key: K, value: LocalStorageTypes[K]) {
  setStorageItem(localStorage, key, value);
}

export function getItem<K extends LocalstorageKeys>(key: K): LocalStorageTypes[K] | null {
  return getStorageItem(localStorage, key);
}

export function removeItem(key: LocalstorageKeys) {
  removeStorageItem(localStorage, key);
}

export function setStorageItem<K extends LocalstorageKeys>(storage: StorageArea, key: K, value: LocalStorageTypes[K]) {
  storage.setItem(key, JSON.stringify(value));
}

export function getStorageItem<K extends LocalstorageKeys>(storage: StorageArea, key: K): LocalStorageTypes[K] | null {
  const item = storage.getItem(key);
  return item ? JSON.parse(item) : null;
}

export function removeStorageItem(storage: StorageArea, key: LocalstorageKeys) {
  storage.removeItem(key);
}
