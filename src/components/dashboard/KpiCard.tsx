import type { FC, ReactNode } from 'react';
import { TrendingUp, TrendingDown } from 'lucide-react';

export type KpiVariant = 'emerald' | 'rose' | 'amber' | 'indigo';

interface KpiCardProps {
  title: string;
  value: string;
  delta: number;
  icon: ReactNode;
  variant: KpiVariant;
}

const variantStyles: Record<
  KpiVariant,
  {
    cardBg: string;
    iconBg: string;
    iconText: string;
  }
> = {
  emerald: {
    cardBg: 'bg-[#edf9f3]',
    iconBg: 'bg-emerald-100',
    iconText: 'text-emerald-600',
  },
  rose: {
    cardBg: 'bg-[#fef2f4]',
    iconBg: 'bg-rose-100',
    iconText: 'text-rose-500',
  },
  amber: {
    cardBg: 'bg-[#fef9ee]',
    iconBg: 'bg-amber-100',
    iconText: 'text-amber-500',
  },
  indigo: {
    cardBg: 'bg-[#f5f3fe]',
    iconBg: 'bg-indigo-100',
    iconText: 'text-indigo-600',
  },
};

export const KpiCard: FC<KpiCardProps> = ({ title, value, delta, icon, variant }) => {
  const isPositive = delta >= 0;
  const { cardBg, iconBg, iconText } = variantStyles[variant];

  return (
    <div
      className={`flex items-center gap-4.5 rounded-3xl p-5 shadow-xs transition-transform duration-150 hover:-translate-y-0.5 ${cardBg}`}
    >
      {/* Icon Badge */}
      <div
        className={`flex h-13 w-13 shrink-0 items-center justify-center rounded-2xl ${iconBg} ${iconText}`}
      >
        {icon}
      </div>

      {/* Metric Content */}
      <div className="flex flex-col">
        <span className="text-xs font-medium text-slate-500">{title}</span>
        <span className="text-2xl font-extrabold tracking-tight text-slate-900">{value}</span>
        <div className="mt-0.5 flex items-center gap-1">
          {isPositive ? (
            <TrendingUp className="h-3.5 w-3.5 text-emerald-600" />
          ) : (
            <TrendingDown className="h-3.5 w-3.5 text-rose-500" />
          )}
          <span
            className={`text-xs font-semibold ${isPositive ? 'text-emerald-600' : 'text-rose-500'}`}
          >
            {isPositive ? `+${delta}%` : `${delta}%`}
          </span>
        </div>
      </div>
    </div>
  );
};
