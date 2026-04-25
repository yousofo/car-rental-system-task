import { HttpClient, HttpContext, HttpContextToken, HttpHeaders, HttpParams } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { QueryValue } from '@/shared/api-models/api.models';

// These represent the common options object used in HttpClient methods
export interface HttpOptions {
  headers?: HttpHeaders | { [header: string]: string | string[] };
  context?: HttpContext;
  params?: HttpParams | Record<string, QueryValue> ;
}

export const SKIP_AUTH = new HttpContextToken<boolean>(() => false);

export function withSkipAuth(context?: HttpContext) {
  return (context ?? new HttpContext()).set(SKIP_AUTH, true);
}

@Injectable({ providedIn: 'root' })
export class ApiClient {
  private http = inject(HttpClient);
  private baseApiUrl = environment.baseUrl + '/api';

  get<T>(url: string, options?: HttpOptions) {
    return this.http.get<T>(this.baseApiUrl + url, options);
  }

  post<T>(url: string, body: any, options?: HttpOptions) {
    return this.http.post<T>(this.baseApiUrl + url, body, options);
  }
  
  put<T>(url: string, body: any, options?: HttpOptions) {
    return this.http.put<T>(this.baseApiUrl + url, body, options);
  }

  delete<T>(url: string, options?: HttpOptions) {
    return this.http.delete<T>(this.baseApiUrl + url, options);
  }
}
