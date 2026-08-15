import type { FC } from 'react';
import { ShoppingCart, Users, Ticket } from 'lucide-react';
import { KpiCard } from './KpiCard';
import type { KpiMetrics } from '../../utils/metrics';
import { formatCurrency, formatNumber } from '../../utils/formatters';

interface KpiGridProps {
  metrics: KpiMetrics;
  isLoading?: boolean;
}

export const KpiGrid: FC<KpiGridProps> = ({ metrics, isLoading = false }) => {
  if (isLoading) {
    return (
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {[1, 2, 3, 4].map((i) => (
          <div key={i} className="h-28 animate-pulse rounded-3xl bg-white/70 shadow-xs" />
        ))}
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
      {/* 1. Ingresos */}
      <KpiCard
        title="Ingresos"
        value={formatCurrency(metrics.revenue)}
        delta={metrics.revenueDelta}
        variant="emerald"
        icon={<span className="text-xl font-black">€</span>}
      />

      {/* 2. Pedidos */}
      <KpiCard
        title="Pedidos"
        value={formatNumber(metrics.ordersCount)}
        delta={metrics.ordersDelta}
        variant="rose"
        icon={<ShoppingCart className="h-6 w-6 stroke-[2.2]" />}
      />

      {/* 3. Clientes */}
      <KpiCard
        title="Clientes"
        value={formatNumber(metrics.customersCount)}
        delta={metrics.customersDelta}
        variant="amber"
        icon={<Users className="h-6 w-6 stroke-[2.2]" />}
      />

      {/* 4. Ticket medio */}
      <KpiCard
        title="Ticket medio"
        value={formatCurrency(metrics.averageTicket)}
        delta={metrics.averageTicketDelta}
        variant="indigo"
        icon={<Ticket className="h-6 w-6 stroke-[2.2]" />}
      />
    </div>
  );
};
