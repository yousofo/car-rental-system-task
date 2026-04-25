import { Injectable, inject } from '@angular/core';
import { map } from 'rxjs';
import { CustomerInstallmentsApi } from '../api/installments.api';
import { CustomerInstallmentsQueryDto } from '../api/installments.dto';
import { mapInstallmentDtoToCustomerInstallment } from './installment.mapper';

@Injectable({
  providedIn: 'root',
})
export class CustomerInstallmentsService {
  private installmentsApi = inject(CustomerInstallmentsApi);

  list(query?: CustomerInstallmentsQueryDto) {
    return this.installmentsApi.list(query).pipe(
      map((response) => ({
        ...response,
        data: response.data.map(mapInstallmentDtoToCustomerInstallment),
      })),
    );
  }

  pay(installmentId: number) {
    return this.installmentsApi.pay(installmentId).pipe(map(mapInstallmentDtoToCustomerInstallment));
  }
}
