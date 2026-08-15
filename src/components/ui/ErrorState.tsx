import type { FC } from 'react';
import { AlertCircle, RefreshCw } from 'lucide-react';
import { Button } from './Button';

interface ErrorStateProps {
  title?: string;
  message?: string;
  onRetry?: () => void;
  isRetrying?: boolean;
  className?: string;
}

export const ErrorState: FC<ErrorStateProps> = ({
  title = 'Error al cargar los datos',
  message = 'Ha ocurrido un problema al comunicar con el servidor simulado.',
  onRetry,
  isRetrying = false,
  className = '',
}) => {
  return (
    <div
      role="alert"
      aria-live="assertive"
      className={`rounded-3xl border border-rose-200 bg-rose-50/70 p-6 shadow-xs ${className}`}
    >
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div className="flex items-start gap-3.5">
          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-2xl bg-rose-100 text-rose-600">
            <AlertCircle className="h-5 w-5 stroke-[2.2]" />
          </div>
          <div>
            <h4 className="text-sm font-bold text-rose-900">{title}</h4>
            <p className="mt-0.5 text-xs text-rose-700">{message}</p>
          </div>
        </div>

        {onRetry && (
          <Button
            variant="danger"
            size="sm"
            onClick={onRetry}
            disabled={isRetrying}
            className="self-start sm:self-auto shrink-0"
          >
            <RefreshCw className={`h-3.5 w-3.5 ${isRetrying ? 'animate-spin' : ''}`} />
            {isRetrying ? 'Reintentando...' : 'Reintentar'}
          </Button>
        )}
      </div>
    </div>
  );
};
