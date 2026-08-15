import type { FC } from 'react';
import { useFilterStore, type DatePreset } from '../../store/filterStore';
import type { Category } from '../../types/analytics';
import { Filter, Calendar, RotateCcw } from 'lucide-react';

interface FilterBarProps {
  categories: Category[];
}

const datePresetOptions: { label: string; value: DatePreset }[] = [
  { label: '7 días', value: '7d' },
  { label: '30 días', value: '30d' },
  { label: '90 días', value: '90d' },
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
    <div className="flex flex-wrap items-center justify-between gap-4 rounded-3xl border border-slate-100 bg-white p-4 shadow-xs">
      {/* Category Pills */}
      <div className="flex flex-wrap items-center gap-2">
        <div className="mr-1 flex items-center gap-1.5 text-xs font-semibold text-slate-400">
          <Filter className="h-3.5 w-3.5" />
          <span className="hidden sm:inline">Categoría:</span>
        </div>

        <button
          type="button"
          onClick={() => setSelectedCategory('all')}
          className={`rounded-full px-3.5 py-1.5 text-xs font-semibold transition-colors ${
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
              className={`rounded-full px-3.5 py-1.5 text-xs font-semibold transition-colors ${
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

      {/* Date Range & Reset */}
      <div className="flex items-center gap-3">
        <div className="flex items-center gap-1 rounded-2xl bg-slate-50 p-1 border border-slate-100">
          <Calendar className="ml-2 h-3.5 w-3.5 text-slate-400" />
          {datePresetOptions.map((opt) => {
            const isSelected = datePreset === opt.value;
            return (
              <button
                key={opt.value}
                type="button"
                onClick={() => setDatePreset(opt.value)}
                className={`rounded-xl px-2.5 py-1 text-xs font-semibold transition-colors ${
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
            className="inline-flex items-center gap-1 rounded-full px-3 py-1.5 text-xs font-medium text-slate-500 hover:bg-slate-100 hover:text-slate-800 transition-colors"
            title="Restablecer filtros"
          >
            <RotateCcw className="h-3 w-3" />
            <span className="hidden sm:inline">Limpiar</span>
          </button>
        )}
      </div>
    </div>
  );
};
