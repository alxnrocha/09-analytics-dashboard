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

export interface CategoryBreakdown {
  id: string;
  name: string;
  revenue: number;
  percentage: number;
  color: string;
  secondaryColor: string;
}

export interface TopProductItem {
  id: string;
  name: string;
  category: string;
  unitsSold: number;
  revenue: number;
  price: number;
  isHot?: boolean;
  imageUrl?: string;
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

const CATEGORY_PALETTE: Record<string, { color: string; secondary: string; displayName?: string }> =
  {
    'cat-electronica': {
      color: '#8b5cf6',
      secondary: '#c4b5fd',
      displayName: 'Electrónica',
    },
    'cat-ropa': { color: '#3b82f6', secondary: '#93c5fd', displayName: 'Moda' },
    'cat-hogar': { color: '#10b981', secondary: '#6ee7b7', displayName: 'Hogar' },
    'cat-deportes': {
      color: '#f59e0b',
      secondary: '#fde68a',
      displayName: 'Deportes',
    },
    'cat-belleza': {
      color: '#06b6d4',
      secondary: '#a5f3fc',
      displayName: 'Belleza',
    },
    'cat-otros': { color: '#f97316', secondary: '#fed7aa', displayName: 'Otros' },
  };

export function computeCategoryBreakdown(data: DashboardData): CategoryBreakdown[] {
  const productMap = new Map(data.products.map((p) => [p.id, p]));
  const categoryRevenueMap: Record<string, number> = {};

  let totalRevenue = 0;

  for (const category of data.categories) {
    categoryRevenueMap[category.id] = 0;
  }

  for (const order of data.orders) {
    for (const item of order.items) {
      const product = productMap.get(item.productId);
      if (product) {
        const catId = product.categoryId;
        const rev = item.quantity * item.unitPrice;
        categoryRevenueMap[catId] = (categoryRevenueMap[catId] || 0) + rev;
        totalRevenue += rev;
      }
    }
  }

  const breakdown: CategoryBreakdown[] = data.categories.map((cat) => {
    const revenue = Math.round(categoryRevenueMap[cat.id] || 0);
    const percentage = totalRevenue > 0 ? Math.round((revenue / totalRevenue) * 100) : 0;
    const palette = CATEGORY_PALETTE[cat.id] || {
      color: '#6366f1',
      secondary: '#c7d2fe',
      displayName: cat.name,
    };

    return {
      id: cat.id,
      name: palette.displayName || cat.name,
      revenue,
      percentage,
      color: palette.color,
      secondaryColor: palette.secondary,
    };
  });

  return breakdown.sort((a, b) => b.revenue - a.revenue);
}

const PRODUCT_IMAGES: Record<string, string> = {
  'prod-auriculares':
    'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=100&q=80',
  'prod-smartphone':
    'https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?auto=format&fit=crop&w=100&q=80',
  'prod-camiseta':
    'https://images.unsplash.com/photo-1521572267360-ee0c2909d518?auto=format&fit=crop&w=100&q=80',
  'prod-chaqueta':
    'https://images.unsplash.com/photo-1551028719-00167b16eac5?auto=format&fit=crop&w=100&q=80',
  'prod-lampara':
    'https://images.unsplash.com/photo-1507473885765-e6ed057f782c?auto=format&fit=crop&w=100&q=80',
  'prod-sabanas':
    'https://images.unsplash.com/photo-1522771739844-6a9f6d5f14af?auto=format&fit=crop&w=100&q=80',
  'prod-zapatillas':
    'https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&w=100&q=80',
  'prod-botella':
    'https://images.unsplash.com/photo-1602143407151-7111542de6e8?auto=format&fit=crop&w=100&q=80',
};

export function computeTopProducts(data: DashboardData): TopProductItem[] {
  const categoryMap = new Map(data.categories.map((c) => [c.id, c.name]));
  const statsMap: Record<string, { unitsSold: number; revenue: number }> = {};

  for (const product of data.products) {
    statsMap[product.id] = { unitsSold: 0, revenue: 0 };
  }

  for (const order of data.orders) {
    for (const item of order.items) {
      if (statsMap[item.productId]) {
        statsMap[item.productId].unitsSold += item.quantity;
        statsMap[item.productId].revenue += item.quantity * item.unitPrice;
      }
    }
  }

  const items: TopProductItem[] = data.products.map((p, index) => {
    const stats = statsMap[p.id] || { unitsSold: 0, revenue: 0 };
    return {
      id: p.id,
      name: p.name,
      category: categoryMap.get(p.categoryId) || 'General',
      unitsSold: stats.unitsSold,
      revenue: Math.round(stats.revenue),
      price: p.price,
      isHot: index === 0,
      imageUrl: PRODUCT_IMAGES[p.id] || '',
    };
  });

  return items.sort((a, b) => b.revenue - a.revenue);
}
