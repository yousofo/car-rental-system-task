import { InstallmentDto, OrderDto } from '@/shared/api-models/api.models';

export interface CustomerOrderInstallment {
  id: number;
  amount: number;
  dueDate: string;
  status: InstallmentDto['status'];
  paidAt: string | null;
}

export interface CustomerOrder {
  id: number;
  carId: number;
  carName: string | null;
  carBrand: string | null;
  deliveryDate: string;
  receivingDate: string;
  days: number;
  totalPrice: number;
  paymentType: OrderDto['payment_type'];
  paymentStatus: OrderDto['payment_status'];
  orderType: OrderDto['order_type'];
  createdAt: string;
  installments: CustomerOrderInstallment[];
}

export function mapOrderDtoToCustomerOrder(order: OrderDto): CustomerOrder {
  return {
    id: order.id,
    carId: order.car_id,
    carName: order.car?.name ?? null,
    carBrand: order.car?.brand ?? null,
    deliveryDate: order.delivery_date,
    receivingDate: order.receiving_date,
    days: order.days,
    totalPrice: Number(order.total_price),
    paymentType: order.payment_type,
    paymentStatus: order.payment_status,
    orderType: order.order_type,
    createdAt: order.created_at,
    installments: (order.installments ?? []).map(mapOrderInstallment),
  };
}

function mapOrderInstallment(installment: InstallmentDto): CustomerOrderInstallment {
  return {
    id: installment.id,
    amount: Number(installment.amount),
    dueDate: installment.due_date,
    status: installment.status,
    paidAt: installment.paid_at,
  };
}
