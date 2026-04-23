import { HttpClient, HttpContext, HttpHeaders, HttpParams } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';

// These represent the common options object used in HttpClient methods
export interface HttpOptions {
  headers?: HttpHeaders | { [header: string]: string | string[] };
  context?: HttpContext;
  params?: HttpParams | { [param: string]: string | number | boolean | ReadonlyArray<string | number | boolean> };
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
