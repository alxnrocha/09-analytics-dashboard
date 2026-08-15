import type { DashboardData } from '../services/mockApi';

export interface KpiMetrics {
  revenue: number;
  revenueDelta: number;
  ordersCount: number;
  ordersDelta: number;
  customersCount: number;
  customersDelta: number;
  averageTicket: number;
  averageTicketDelta: number;
}

export function computeKpiMetrics(data: DashboardData): KpiMetrics {
  const revenue = data.orders.reduce((sum, order) => {
    const orderSum = order.items.reduce(
      (itemSum, item) => itemSum + item.quantity * item.unitPrice,
      0
    );
    return sum + orderSum;
  }, 0);

  const ordersCount = data.orders.length;
  const averageTicket = ordersCount > 0 ? revenue / ordersCount : 0;
  const customersCount = data.customers.length;

  return {
    revenue,
    revenueDelta: 12.4,
    ordersCount,
    ordersDelta: 8.7,
    customersCount,
    customersDelta: 5.3,
    averageTicket,
    averageTicketDelta: -2.1,
  };
}
