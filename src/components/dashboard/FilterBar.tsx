import type { FC } from 'react';
import { useFilterStore, type DatePreset } from '../../store/filterStore';
import type { Category } from '../../types/analytics';
import { Filter, Calendar, RotateCcw } from 'lucide-react';

interface FilterBarProps {
  categories: Category[];
}

const datePresetOptions: { label: string; value: DatePreset }[] = [
  { label: '7d', value: '7d' },
  { label: '30d', value: '30d' },
  { label: '90d', value: '90d' },
  { label: 'Todo', value: 'all' },
];

export const FilterBar: FC<FilterBarProps> = ({ categories }) => {
  const {
    selectedCategory,
    datePreset,
    searchQuery,
    setSelectedCategory,
    setDatePreset,
    resetFilters,
  } = useFilterStore();

  const isFiltered = selectedCategory !== 'all' || datePreset !== '30d' || searchQuery !== '';

  return (
    <div className="flex flex-col gap-3 rounded-3xl border border-slate-100 bg-white p-3 sm:p-4 shadow-xs md:flex-row md:items-center md:justify-between">
      {/* Category Pills - Scrollable on mobile */}
      <div className="flex items-center gap-1.5 overflow-x-auto pb-1 sm:pb-0 no-scrollbar">
        <div className="mr-1 flex shrink-0 items-center gap-1 text-xs font-semibold text-slate-400">
          <Filter className="h-3.5 w-3.5" />
          <span className="hidden sm:inline">Categoría:</span>
        </div>

        <button
          type="button"
          onClick={() => setSelectedCategory('all')}
          className={`shrink-0 rounded-full px-3 py-1.5 text-xs font-semibold transition-colors ${
            selectedCategory === 'all'
              ? 'bg-indigo-600 text-white shadow-xs'
              : 'bg-slate-50 text-slate-600 hover:bg-slate-100'
          }`}
        >
          Todas
        </button>

        {categories.map((cat) => {
          const isActive = selectedCategory === cat.id;
          return (
            <button
              key={cat.id}
              type="button"
              onClick={() => setSelectedCategory(cat.id)}
              className={`shrink-0 rounded-full px-3 py-1.5 text-xs font-semibold transition-colors ${
                isActive
                  ? 'bg-indigo-600 text-white shadow-xs'
                  : 'bg-slate-50 text-slate-600 hover:bg-slate-100'
              }`}
            >
              {cat.name}
            </button>
          );
        })}
      </div>

      {/* Date Range & Reset Controls */}
      <div className="flex items-center justify-between sm:justify-end gap-2 shrink-0">
        <div className="flex items-center gap-1 rounded-2xl border border-slate-100 bg-slate-50 p-1">
          <Calendar className="ml-1.5 h-3.5 w-3.5 text-slate-400 shrink-0" />
          {datePresetOptions.map((opt) => {
            const isSelected = datePreset === opt.value;
            return (
              <button
                key={opt.value}
                type="button"
                onClick={() => setDatePreset(opt.value)}
                className={`rounded-xl px-2 py-0.5 sm:px-2.5 sm:py-1 text-xs font-semibold transition-colors ${
                  isSelected
                    ? 'bg-white text-indigo-600 shadow-xs'
                    : 'text-slate-500 hover:text-slate-800'
                }`}
              >
                {opt.label}
              </button>
            );
          })}
        </div>

        {/* Reset button */}
        {isFiltered && (
          <button
            type="button"
            onClick={resetFilters}
            className="inline-flex items-center gap-1 rounded-full px-2.5 py-1 text-xs font-medium text-slate-500 hover:bg-slate-100 hover:text-slate-800 transition-colors shrink-0"
            title="Restablecer filtros"
          >
            <RotateCcw className="h-3 w-3" />
            <span className="text-xs">Limpiar</span>
          </button>
        )}
      </div>
    </div>
  );
};
