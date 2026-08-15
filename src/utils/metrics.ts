import type { DashboardData } from '../services/mockApi';
import type { Order } from '../types/analytics';

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

export interface RevenueDataPoint {
  date: string;
  rawDate: string;
  revenue: number;
  orders: number;
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

export function computeRevenueTimeSeries(orders: Order[], daysCount = 30): RevenueDataPoint[] {
  const dailyMap: Record<string, { revenue: number; orders: number }> = {};

  // Find latest order date or default to 2026-08-13
  const allDates = orders.map((o) => o.orderedAt).sort();
  const latestDateStr = allDates[allDates.length - 1] || '2026-08-13';
  const endDate = new Date(latestDateStr);

  const dateList: string[] = [];
  for (let i = daysCount - 1; i >= 0; i--) {
    const d = new Date(endDate);
    d.setDate(d.getDate() - i);
    const iso = d.toISOString().split('T')[0];
    dateList.push(iso);
    dailyMap[iso] = { revenue: 0, orders: 0 };
  }

  for (const order of orders) {
    if (dailyMap[order.orderedAt]) {
      const orderRevenue = order.items.reduce(
        (sum, item) => sum + item.quantity * item.unitPrice,
        0
      );
      dailyMap[order.orderedAt].revenue += orderRevenue;
      dailyMap[order.orderedAt].orders += 1;
    }
  }

  const monthNames = [
    'ene',
    'feb',
    'mar',
    'abr',
    'may',
    'jun',
    'jul',
    'ago',
    'sep',
    'oct',
    'nov',
    'dic',
  ];

  return dateList.map((iso) => {
    const [, m, day] = iso.split('-');
    const formattedDate = `${parseInt(day, 10)} ${monthNames[parseInt(m, 10) - 1]}`;
    return {
      date: formattedDate,
      rawDate: iso,
      revenue: Math.round(dailyMap[iso].revenue),
      orders: dailyMap[iso].orders,
    };
  });
}
