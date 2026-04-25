import { PaymentType } from '@/shared/api-models/api.models';
import { CustomerInstallmentDto } from '../api/installments.dto';

export interface CustomerInstallment {
  id: number;
  orderId: number;
  amount: number;
  dueDate: string;
  status: CustomerInstallmentDto['status'];
  paidAt: string | null;
  carName: string | null;
  paymentType: PaymentType;
}

export function mapInstallmentDtoToCustomerInstallment(installment: CustomerInstallmentDto): CustomerInstallment {
  return {
    id: installment.id,
    orderId: installment.order_id,
    amount: Number(installment.amount),
    dueDate: installment.due_date,
    status: installment.status,
    paidAt: installment.paid_at,
    carName: installment.order?.car?.name ?? null,
    paymentType: installment.order?.payment_type ?? 'cash',
  };
}
