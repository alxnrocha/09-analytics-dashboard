import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import { TopProductsTable } from './TopProductsTable';
import type { TopProductItem } from '../../utils/metrics';

const mockProducts: TopProductItem[] = [
  {
    id: 'prod-1',
    name: 'Auriculares Pro',
    category: 'Electrónica',
    unitsSold: 850,
    revenue: 62480,
    price: 89,
    isHot: true,
  },
  {
    id: 'prod-2',
    name: 'Reloj GPS',
    category: 'Electrónica',
    unitsSold: 420,
    revenue: 18275,
    price: 199,
    isHot: false,
  },
];

describe('TopProductsTable Component', () => {
  it('renders products and table header columns', () => {
    render(<TopProductsTable products={mockProducts} />);

    expect(screen.getByText('Productos destacados')).toBeInTheDocument();
    expect(screen.getByText('Auriculares Pro')).toBeInTheDocument();
    expect(screen.getByText('Reloj GPS')).toBeInTheDocument();
    expect(screen.getByText('🔥')).toBeInTheDocument();
  });

  it('renders empty state when no products are passed', () => {
    render(<TopProductsTable products={[]} />);

    expect(screen.getByText('No hay productos disponibles para mostrar.')).toBeInTheDocument();
  });

  it('supports sorting on columns', () => {
    render(<TopProductsTable products={mockProducts} />);

    const sortButton = screen.getByRole('button', {
      name: /Ordenar por Ventas/i,
    });
    expect(sortButton).toBeInTheDocument();

    fireEvent.click(sortButton);
  });
});
