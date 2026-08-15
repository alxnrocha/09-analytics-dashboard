import type { FC, ReactNode } from 'react';
import { SearchX, type LucideIcon } from 'lucide-react';
import { Button } from './Button';

interface EmptyStateProps {
  title?: string;
  description?: string;
  icon?: LucideIcon;
  actionLabel?: string;
  onAction?: () => void;
  className?: string;
  children?: ReactNode;
}

export const EmptyState: FC<EmptyStateProps> = ({
  title = 'No hay datos disponibles',
  description = 'No se encontraron resultados para los filtros seleccionados.',
  icon: Icon = SearchX,
  actionLabel,
  onAction,
  className = '',
  children,
}) => {
  return (
    <div
      role="region"
      aria-label={title}
      className={`flex min-h-[220px] flex-col items-center justify-center rounded-3xl border border-dashed border-slate-200 bg-white/60 p-8 text-center backdrop-blur-xs ${className}`}
    >
      <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-indigo-50 text-indigo-500 shadow-xs">
        <Icon className="h-6 w-6 stroke-[1.8]" />
      </div>

      <h4 className="mt-3 text-sm font-bold text-slate-800">{title}</h4>
      <p className="mt-1 max-w-sm text-xs text-slate-500">{description}</p>

      {actionLabel && onAction && (
        <div className="mt-4">
          <Button variant="secondary" size="sm" onClick={onAction}>
            {actionLabel}
          </Button>
        </div>
      )}

      {children}
    </div>
  );
};
