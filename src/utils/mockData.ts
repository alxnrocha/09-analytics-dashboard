import type { Category, Customer, Order, OrderStatus, Product } from '../types/analytics';

export const categories: Category[] = [
  { id: 'cat-electronica', name: 'Electrónica', slug: 'electronica' },
  { id: 'cat-ropa', name: 'Ropa', slug: 'ropa' },
  { id: 'cat-hogar', name: 'Hogar', slug: 'hogar' },
  { id: 'cat-deportes', name: 'Deportes', slug: 'deportes' },
];

export const customers: Customer[] = [
  { id: 'cust-1', name: 'María García', country: 'España' },
  { id: 'cust-2', name: 'Joan Puig', country: 'España' },
  { id: 'cust-3', name: 'Lucía Fernández', country: 'España' },
  { id: 'cust-4', name: 'Carlos Ruiz', country: 'España' },
  { id: 'cust-5', name: 'Ana Torres', country: 'España' },
  { id: 'cust-6', name: 'Pau Vidal', country: 'España' },
];

export const products: Product[] = [
  {
    id: 'prod-auriculares',
    categoryId: 'cat-electronica',
    name: 'Auriculares inalámbricos',
    price: 89.99,
    stock: 120,
  },
  {
    id: 'prod-smartphone',
    categoryId: 'cat-electronica',
    name: 'Smartphone X',
    price: 699,
    stock: 45,
  },
  {
    id: 'prod-camiseta',
    categoryId: 'cat-ropa',
    name: 'Camiseta básica',
    price: 19.99,
    stock: 300,
  },
  {
    id: 'prod-chaqueta',
    categoryId: 'cat-ropa',
    name: 'Chaqueta de invierno',
    price: 89.5,
    stock: 80,
  },
  {
    id: 'prod-lampara',
    categoryId: 'cat-hogar',
    name: 'Lámpara de escritorio',
    price: 34.99,
    stock: 60,
  },
  { id: 'prod-sabanas', categoryId: 'cat-hogar', name: 'Juego de sábanas', price: 45, stock: 90 },
  {
    id: 'prod-zapatillas',
    categoryId: 'cat-deportes',
    name: 'Zapatillas running',
    price: 79.95,
    stock: 50,
  },
  {
    id: 'prod-botella',
    categoryId: 'cat-deportes',
    name: 'Botella térmica',
    price: 24.99,
    stock: 150,
  },
];

// Deterministic PRNG so the mock data is stable across reloads and tests.
function mulberry32(seed: number) {
  return function () {
    seed |= 0;
    seed = (seed + 0x6d2b79f5) | 0;
    let t = Math.imul(seed ^ (seed >>> 15), 1 | seed);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

const rand = mulberry32(20260813);

const statuses: OrderStatus[] = ['Paid', 'Paid', 'Paid', 'Shipped', 'Shipped', 'Pending'];

function toISODate(d: Date): string {
  const y = d.getFullYear();
  const m = String(d.getMonth() + 1).padStart(2, '0');
  const day = String(d.getDate()).padStart(2, '0');
  return `${y}-${m}-${day}`;
}

export const orders: Order[] = (() => {
  const generated: Order[] = [];
  const today = new Date('2026-08-13');
  let orderIndex = 1;

  for (let day = 179; day >= 0; day--) {
    const date = new Date(today);
    date.setDate(date.getDate() - day);
    const ordersToday = Math.floor(rand() * 4);

    for (let o = 0; o < ordersToday; o++) {
      const itemCount = 1 + Math.floor(rand() * 3);
      const items = Array.from({ length: itemCount }, () => {
        const product = products[Math.floor(rand() * products.length)];
        return {
          productId: product.id,
          quantity: 1 + Math.floor(rand() * 3),
          unitPrice: product.price,
        };
      });

      generated.push({
        id: `ORD-${String(orderIndex).padStart(4, '0')}`,
        customerId: customers[Math.floor(rand() * customers.length)].id,
        orderedAt: toISODate(date),
        status: statuses[Math.floor(rand() * statuses.length)],
        items,
      });
      orderIndex++;
    }
  }

  return generated;
})();
