import { useState, type FC } from 'react';
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
} from 'recharts';
import type { Order } from '../../types/analytics';
import { computeRevenueTimeSeries } from '../../utils/metrics';
import { formatCurrency, formatCompactCurrency } from '../../utils/formatters';
import { ShoppingBag } from 'lucide-react';

interface RevenueChartProps {
  orders: Order[];
  isLoading?: boolean;
}

interface CustomTooltipProps {
  active?: boolean;
  payload?: Array<{ value: number; payload: { date: string; orders: number } }>;
}

const CustomTooltip: FC<CustomTooltipProps> = ({ active, payload }) => {
  if (active && payload && payload.length) {
    const data = payload[0];
    return (
      <div className="rounded-2xl border border-indigo-100 bg-white/95 p-3 shadow-lg backdrop-blur-xs">
        <p className="text-xs font-semibold text-slate-500">{data.payload.date}</p>
        <p className="text-sm sm:text-base font-extrabold text-indigo-600">
          {formatCurrency(data.value)}
        </p>
        <p className="text-[11px] text-slate-400">{data.payload.orders} pedidos registrados</p>
      </div>
    );
  }
  return null;
};

export const RevenueChart: FC<RevenueChartProps> = ({ orders, isLoading = false }) => {
  const [days, setDays] = useState(30);
  const chartData = computeRevenueTimeSeries(orders, days);

  if (isLoading) {
    return (
      <div className="flex h-80 flex-col rounded-3xl border border-slate-100 bg-white p-4 sm:p-6 shadow-xs">
        <div className="h-6 w-48 animate-pulse rounded-lg bg-slate-100" />
        <div className="mt-6 flex-1 animate-pulse rounded-2xl bg-slate-50" />
      </div>
    );
  }

  return (
    <div className="relative flex flex-col rounded-3xl border border-slate-100 bg-white p-4 sm:p-6 shadow-xs">
      {/* Header & Controls */}
      <div className="mb-4 flex flex-wrap items-center justify-between gap-3">
        <div>
          <h3 className="text-sm sm:text-base font-bold text-slate-900">Ingresos por periodo</h3>
          <p className="text-[11px] sm:text-xs text-slate-400">
            Evolución diaria de ventas en euros
          </p>
        </div>

        <div className="flex items-center gap-2 sm:gap-3">
          <div className="relative">
            <select
              value={days}
              onChange={(e) => setDays(Number(e.target.value))}
              className="cursor-pointer appearance-none rounded-full border border-slate-200 bg-white px-3 sm:px-4 py-1.5 pr-7 sm:pr-8 text-xs font-medium text-slate-700 shadow-xs transition-colors hover:bg-slate-50 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20 focus:outline-none"
              aria-label="Seleccionar periodo"
            >
              <option value={7}>7 días</option>
              <option value={30}>30 días</option>
              <option value={90}>90 días</option>
            </select>
            <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2.5 sm:pr-3 text-slate-400 text-[10px]">
              ▼
            </div>
          </div>

          {/* Decorative 3D Shopping Bag Accent */}
          <div className="hidden sm:flex h-9 w-9 items-center justify-center rounded-2xl bg-gradient-to-br from-indigo-500 to-purple-600 text-white shadow-xs">
            <ShoppingBag className="h-4 w-4" />
          </div>
        </div>
      </div>

      {/* Area Chart */}
      <div className="h-56 sm:h-64 w-full">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={chartData} margin={{ top: 10, right: 10, left: -25, bottom: 0 }}>
            <defs>
              <linearGradient id="revenueGradient" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#8b5cf6" stopOpacity={0.35} />
                <stop offset="95%" stopColor="#8b5cf6" stopOpacity={0.0} />
              </linearGradient>
            </defs>

            <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />

            <XAxis
              dataKey="date"
              axisLine={false}
              tickLine={false}
              tick={{ fill: '#94a3b8', fontSize: 10 }}
              interval="preserveStartEnd"
              dy={10}
            />

            <YAxis
              axisLine={false}
              tickLine={false}
              tick={{ fill: '#94a3b8', fontSize: 10 }}
              tickFormatter={formatCompactCurrency}
              dx={-2}
            />

            <Tooltip content={<CustomTooltip />} />

            <Area
              type="monotone"
              dataKey="revenue"
              stroke="#8b5cf6"
              strokeWidth={3}
              fillOpacity={1}
              fill="url(#revenueGradient)"
              activeDot={{
                r: 5,
                fill: '#8b5cf6',
                stroke: '#ffffff',
                strokeWidth: 2,
              }}
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};
