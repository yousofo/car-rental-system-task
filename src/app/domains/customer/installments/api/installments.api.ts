import { Injectable } from '@angular/core';
import { BaseApiService } from '@/core/api/base-api-service';
import { ENDPOINTS } from '@/core/api/endpoints';
import { CustomerInstallmentDto, CustomerInstallmentsListResponseDto, CustomerInstallmentsQueryDto } from './installments.dto';

@Injectable({
  providedIn: 'root',
})
export class CustomerInstallmentsApi extends BaseApiService {
  list(query?: CustomerInstallmentsQueryDto) {
    return this.apiClient.get<CustomerInstallmentsListResponseDto>(ENDPOINTS.CUSTOMER.INSTALLMENTS.ROOT, {
      params: query as Record<string, string | number | boolean | readonly (string | number | boolean)[]> | undefined,
    });
  }

  pay(installmentId: number) {
    return this.apiClient.post<CustomerInstallmentDto>(ENDPOINTS.CUSTOMER.INSTALLMENTS.pay(installmentId), {});
  }
}
