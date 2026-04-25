import { UserDto, UserRole } from "@/shared/api-models/api.models";

export enum LocalstorageKeys  {
  BEARER_TOKEN= 'TOKEN',
  USER_ROLE= 'USER_ROLE',
  LANGUAGE= 'LANGUAGE',
  USER_DETAILS= 'USER_DETAILS',
  THEME= 'THEME',
};

//local storage return value types
export interface LocalStorageTypes {
  [LocalstorageKeys.BEARER_TOKEN]: string;
  [LocalstorageKeys.USER_ROLE]: UserRole;
  [LocalstorageKeys.LANGUAGE]: 'ar' | 'en';
  [LocalstorageKeys.USER_DETAILS]: UserDto;
  [LocalstorageKeys.THEME]: 'light' | 'dark';
}
