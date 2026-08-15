export type OrderStatus = 'Pending' | 'Paid' | 'Shipped' | 'Cancelled';

export interface Category {
  id: string;
  name: string;
  slug: string;
}

export interface Customer {
  id: string;
  name: string;
  country: string;
}

export interface Product {
  id: string;
  categoryId: string;
  name: string;
  price: number;
  stock: number;
}

export interface OrderItem {
  productId: string;
  quantity: number;
  unitPrice: number;
}

export interface Order {
  id: string;
  customerId: string;
  orderedAt: string;
  status: OrderStatus;
  items: OrderItem[];
}
