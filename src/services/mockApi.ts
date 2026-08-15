import { categories, customers, orders, products } from '../utils/mockData';
import type { Category, Customer, Order, Product } from '../types/analytics';

const DELAY = 600;

export interface DashboardData {
  categories: Category[];
  products: Product[];
  customers: Customer[];
  orders: Order[];
}

function simulate<T>(data: T): Promise<T> {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (Math.random() < 0.05) {
        reject(new Error('Error de red al obtener los datos.'));
      } else {
        resolve(data);
      }
    }, DELAY);
  });
}

export const mockApi = {
  fetchDashboard: (): Promise<DashboardData> =>
    simulate({ categories, products, customers, orders }),
};
