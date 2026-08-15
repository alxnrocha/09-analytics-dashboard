import type { FC } from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from 'recharts';
import type { CategoryBreakdown } from '../../utils/metrics';
import { formatCurrency } from '../../utils/formatters';

interface SalesDistributionDonutProps {
  categories: CategoryBreakdown[];
  totalRevenue: number;
  isLoading?: boolean;
}

interface CustomTooltipProps {
  active?: boolean;
  payload?: Array<{
    name: string;
    value: number;
    payload: CategoryBreakdown;
  }>;
}

const CustomTooltip: FC<CustomTooltipProps> = ({ active, payload }) => {
  if (active && payload && payload.length) {
    const item = payload[0].payload;
    return (
      <div className="rounded-2xl border border-indigo-100 bg-white/95 p-3 shadow-lg backdrop-blur-xs">
        <p className="text-xs font-semibold text-slate-500">{item.name}</p>
        <p className="text-base font-extrabold text-slate-900">{formatCurrency(item.revenue)}</p>
        <p className="text-xs font-medium text-indigo-600">{item.percentage}% del total</p>
      </div>
    );
  }
  return null;
};

export const SalesDistributionDonut: FC<SalesDistributionDonutProps> = ({
  categories,
  totalRevenue,
  isLoading = false,
}) => {
  if (isLoading) {
    return (
      <div className="flex h-full min-h-[300px] flex-col rounded-3xl border border-slate-100 bg-white p-4 sm:p-6 shadow-xs">
        <div className="h-6 w-40 animate-pulse rounded-lg bg-slate-100" />
        <div className="mt-6 flex-1 animate-pulse rounded-2xl bg-slate-50" />
      </div>
    );
  }

  return (
    <div className="flex h-full flex-col justify-between rounded-3xl border border-slate-100 bg-white p-4 sm:p-6 shadow-xs">
      {/* Card Header */}
      <div className="flex items-center justify-between">
        <h3 className="text-sm sm:text-base font-bold text-slate-900">Distribución de ventas</h3>
        <span className="rounded-full bg-indigo-50 px-2.5 py-0.5 text-[11px] font-semibold text-indigo-600">
          30d
        </span>
      </div>

      {/* Donut Chart & Legend */}
      <div className="my-auto flex flex-col items-center gap-4 py-2 sm:flex-row sm:justify-around">
        {/* Donut with Center Text */}
        <div className="relative h-44 w-44 sm:h-48 sm:w-48 shrink-0">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Tooltip content={<CustomTooltip />} />
              <Pie
                data={categories}
                dataKey="revenue"
                nameKey="name"
                innerRadius={50}
                outerRadius={75}
                paddingAngle={4}
                cornerRadius={6}
              >
                {categories.map((entry) => (
                  <Cell
                    key={`cell-${entry.id}`}
                    fill={entry.color}
                    stroke="#ffffff"
                    strokeWidth={2}
                  />
                ))}
              </Pie>
            </PieChart>
          </ResponsiveContainer>

          {/* Center Info */}
          <div className="pointer-events-none absolute inset-0 flex flex-col items-center justify-center text-center">
            <span className="text-xs sm:text-sm font-extrabold text-slate-900">
              {formatCurrency(totalRevenue)}
            </span>
            <span className="text-[10px] sm:text-[11px] font-medium text-slate-400">Total</span>
          </div>
        </div>

        {/* Legend List */}
        <div className="grid grid-cols-2 gap-x-4 gap-y-2 sm:flex sm:flex-col sm:gap-2.5 w-full sm:w-auto">
          {categories.map((cat) => (
            <div key={cat.id} className="flex items-center justify-between gap-3 text-xs">
              <div className="flex items-center gap-1.5 min-w-0">
                <span
                  className="h-2 w-2 sm:h-2.5 sm:w-2.5 rounded-full shrink-0"
                  style={{ backgroundColor: cat.color }}
                />
                <span className="font-medium text-slate-600 truncate">{cat.name}</span>
              </div>
              <span className="font-bold text-slate-900 shrink-0">{cat.percentage}%</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
