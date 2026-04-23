import { inject } from "@angular/core";
import { ApiClient } from "./api-client";

export class BaseApiService {
  protected apiClient = inject(ApiClient);
}