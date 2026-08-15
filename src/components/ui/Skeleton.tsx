import type { FC, HTMLAttributes } from 'react';

interface SkeletonProps extends HTMLAttributes<HTMLDivElement> {
  className?: string;
  variant?: 'rectangular' | 'circular' | 'rounded';
}

export const Skeleton: FC<SkeletonProps> = ({ className = '', variant = 'rounded', ...rest }) => {
  const variantClass =
    variant === 'circular'
      ? 'rounded-full'
      : variant === 'rounded'
        ? 'rounded-2xl'
        : 'rounded-none';

  return (
    <div
      role="status"
      aria-label="Cargando contenido..."
      aria-busy="true"
      className={`animate-pulse bg-slate-200/70 dark:bg-slate-700/40 ${variantClass} ${className}`}
      {...rest}
    >
      <span className="sr-only">Cargando...</span>
    </div>
  );
};
