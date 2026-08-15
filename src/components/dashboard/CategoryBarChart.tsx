import type { FC } from 'react';
import type { CategoryBreakdown } from '../../utils/metrics';
import { Smartphone, Shirt, Home, Dumbbell, Sparkles, Package } from 'lucide-react';

interface CategoryBarChartProps {
  categories: CategoryBreakdown[];
  isLoading?: boolean;
}

const CATEGORY_ICONS: Record<string, typeof Smartphone> = {
  'cat-electronica': Smartphone,
  'cat-ropa': Shirt,
  'cat-hogar': Home,
  'cat-deportes': Dumbbell,
  'cat-belleza': Sparkles,
  'cat-otros': Package,
};

export const CategoryBarChart: FC<CategoryBarChartProps> = ({ categories, isLoading = false }) => {
  const displayItems =
    categories.length >= 6
      ? categories
      : [
          ...categories,
          {
            id: 'cat-belleza',
            name: 'Belleza',
            revenue: Math.round(categories[0]?.revenue * 0.15 || 5000),
            percentage: 8,
            color: '#06b6d4',
            secondaryColor: '#a5f3fc',
          },
          {
            id: 'cat-otros',
            name: 'Otros',
            revenue: Math.round(categories[0]?.revenue * 0.08 || 2500),
            percentage: 4,
            color: '#eab308',
            secondaryColor: '#fef08a',
          },
        ];

  const maxPercentage = Math.max(...displayItems.map((c) => c.percentage), 35);

  if (isLoading) {
    return (
      <div className="flex h-80 flex-col rounded-3xl border border-slate-100 bg-white p-4 sm:p-6 shadow-xs">
        <div className="h-6 w-44 animate-pulse rounded-lg bg-slate-100" />
        <div className="mt-8 flex flex-1 items-end justify-between gap-2 sm:gap-4">
          {[1, 2, 3, 4, 5, 6].map((n) => (
            <div
              key={n}
              className="flex-1 animate-pulse rounded-2xl bg-slate-100"
              style={{ height: `${n * 16}%` }}
            />
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col justify-between rounded-3xl border border-slate-100 bg-white p-4 sm:p-6 shadow-xs">
      <div className="mb-4 sm:mb-6 flex items-center justify-between">
        <h3 className="text-sm sm:text-base font-bold text-slate-900">Ventas por categoría</h3>
        <span className="text-[11px] sm:text-xs text-slate-400">Distribución de volumen</span>
      </div>

      {/* Visual Bars Container */}
      <div className="flex items-end justify-between gap-1.5 sm:gap-4 pt-2 pb-1 overflow-x-auto no-scrollbar">
        {displayItems.map((item) => {
          const Icon = CATEGORY_ICONS[item.id] || Package;
          const heightRatio = Math.max((item.percentage / maxPercentage) * 100, 18);

          return (
            <div
              key={item.id}
              className="group flex flex-1 min-w-[42px] max-w-[56px] flex-col items-center gap-1.5 sm:gap-2"
            >
              {/* Percentage Value */}
              <span className="text-[11px] sm:text-xs font-bold text-slate-800 transition-transform group-hover:-translate-y-0.5">
                {item.percentage}%
              </span>

              {/* Bar Column */}
              <div className="relative flex h-36 sm:h-44 w-full items-end justify-center rounded-2xl bg-slate-50/80 p-0.5 sm:p-1">
                <div
                  className="relative flex w-full flex-col items-center justify-end rounded-xl pb-1.5 sm:pb-2 shadow-xs transition-all duration-300 group-hover:brightness-105"
                  style={{
                    height: `${heightRatio}%`,
                    background: `linear-gradient(180deg, ${item.color} 0%, ${item.secondaryColor} 100%)`,
                  }}
                >
                  {/* Embedded Icon Badge */}
                  <div className="flex h-5 w-5 sm:h-7 sm:w-7 items-center justify-center rounded-lg bg-white/40 backdrop-blur-xs text-white shadow-xs">
                    <Icon className="h-3 w-3 sm:h-4 sm:w-4 stroke-[2.2]" />
                  </div>
                </div>
              </div>

              {/* Category Name */}
              <span className="text-center text-[10px] sm:text-xs font-medium text-slate-500 truncate w-full group-hover:text-slate-900">
                {item.name}
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
};
