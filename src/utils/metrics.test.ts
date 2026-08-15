import { describe, it, expect } from 'vitest';
import {
  computeKpiMetrics,
  computeRevenueTimeSeries,
  computeCategoryBreakdown,
  computeTopProducts,
  filterDashboardData,
} from './metrics';
import type { DashboardData } from '../services/mockApi';

const mockData: DashboardData = {
  categories: [
    { id: 'cat-1', name: 'Electrónica', slug: 'electronica' },
    { id: 'cat-2', name: 'Ropa', slug: 'ropa' },
  ],
  products: [
    { id: 'prod-1', categoryId: 'cat-1', name: 'Laptop', price: 1000, stock: 10 },
    { id: 'prod-2', categoryId: 'cat-2', name: 'Camiseta', price: 20, stock: 50 },
  ],
  customers: [
    { id: 'cust-1', name: 'Ana López', country: 'España' },
    { id: 'cust-2', name: 'Carlos Ruiz', country: 'España' },
  ],
  orders: [
    {
      id: 'ord-1',
      customerId: 'cust-1',
      orderedAt: '2026-08-10',
      status: 'Paid',
      items: [{ productId: 'prod-1', quantity: 2, unitPrice: 1000 }],
    },
    {
      id: 'ord-2',
      customerId: 'cust-2',
      orderedAt: '2026-08-12',
      status: 'Paid',
      items: [{ productId: 'prod-2', quantity: 5, unitPrice: 20 }],
    },
  ],
};

describe('Metrics Utilities', () => {
  it('computes correct KPI metrics from orders', () => {
    const kpis = computeKpiMetrics(mockData);

    // Revenue: (2 * 1000) + (5 * 20) = 2100
    expect(kpis.revenue).toBe(2100);
    expect(kpis.ordersCount).toBe(2);
    expect(kpis.averageTicket).toBe(1050);
    expect(kpis.customersCount).toBe(2);
  });

  it('aggregates revenue time-series correctly', () => {
    const series = computeRevenueTimeSeries(mockData.orders, 7);
    expect(series).toHaveLength(7);

    const totalRevenueInSeries = series.reduce((sum, item) => sum + item.revenue, 0);
    expect(totalRevenueInSeries).toBe(2100);
  });

  it('computes category sales breakdown and percentages', () => {
    const breakdown = computeCategoryBreakdown(mockData);
    expect(breakdown).toHaveLength(2);

    const electronica = breakdown.find((b) => b.id === 'cat-1');
    expect(electronica?.revenue).toBe(2000);
    expect(electronica?.percentage).toBe(95); // 2000 / 2100 ≈ 95%
  });

  it('computes top products ranking', () => {
    const top = computeTopProducts(mockData);
    expect(top[0].id).toBe('prod-1');
    expect(top[0].revenue).toBe(2000);
    expect(top[0].unitsSold).toBe(2);
    expect(top[0].isHot).toBe(true);
  });

  it('filters data by category correctly', () => {
    const filtered = filterDashboardData(mockData, {
      selectedCategory: 'cat-2',
      datePreset: 'all',
      searchQuery: '',
    });

    expect(filtered.orders).toHaveLength(1);
    expect(filtered.orders[0].id).toBe('ord-2');
  });

  it('filters data by search query correctly', () => {
    const filtered = filterDashboardData(mockData, {
      selectedCategory: 'all',
      datePreset: 'all',
      searchQuery: 'Laptop',
    });

    expect(filtered.orders).toHaveLength(1);
    expect(filtered.orders[0].id).toBe('ord-1');
  });
});
