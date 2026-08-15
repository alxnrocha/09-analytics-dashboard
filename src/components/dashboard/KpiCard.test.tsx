import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import { KpiCard } from './KpiCard';
import { ShoppingBag } from 'lucide-react';

describe('KpiCard Component', () => {
  it('renders title, value, delta and positive trend', () => {
    render(
      <KpiCard
        title="Ingresos"
        value="€128.420"
        delta={12.4}
        variant="emerald"
        icon={<ShoppingBag data-testid="kpi-icon" />}
      />
    );

    expect(screen.getByText('Ingresos')).toBeInTheDocument();
    expect(screen.getByText('€128.420')).toBeInTheDocument();
    expect(screen.getByText('+12.4%')).toBeInTheDocument();
    expect(screen.getByTestId('kpi-icon')).toBeInTheDocument();
  });

  it('renders negative delta correctly', () => {
    render(
      <KpiCard
        title="Ticket medio"
        value="€54,72"
        delta={-2.1}
        variant="indigo"
        icon={<ShoppingBag />}
      />
    );

    expect(screen.getByText('-2.1%')).toBeInTheDocument();
  });
});
