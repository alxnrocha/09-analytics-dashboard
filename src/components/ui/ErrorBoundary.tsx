import { Component, type ErrorInfo, type ReactNode } from 'react';
import { AlertTriangle, RefreshCw } from 'lucide-react';
import { Button } from './Button';

interface ErrorBoundaryProps {
  children: ReactNode;
  fallback?: ReactNode;
}

interface ErrorBoundaryState {
  hasError: boolean;
  error: Error | null;
}

export class ErrorBoundary extends Component<ErrorBoundaryProps, ErrorBoundaryState> {
  public override state: ErrorBoundaryState = {
    hasError: false,
    error: null,
  };

  public static getDerivedStateFromError(error: Error): ErrorBoundaryState {
    return { hasError: true, error };
  }

  public override componentDidCatch(error: Error, errorInfo: ErrorInfo): void {
    console.error('ErrorBoundary capturó un error no controlado:', error, errorInfo);
  }

  private handleReset = () => {
    this.setState({ hasError: false, error: null });
    window.location.reload();
  };

  public override render(): ReactNode {
    if (this.state.hasError) {
      if (this.props.fallback) {
        return this.props.fallback;
      }

      return (
        <div
          role="alert"
          aria-live="assertive"
          className="flex min-h-[400px] flex-col items-center justify-center p-8 text-center"
        >
          <div className="flex h-14 w-14 items-center justify-center rounded-3xl bg-rose-100 text-rose-600 shadow-xs">
            <AlertTriangle className="h-7 w-7 stroke-[2]" />
          </div>

          <h2 className="mt-4 text-xl font-bold text-slate-900">Algo salió mal en el panel</h2>

          <p className="mt-2 max-w-md text-xs text-slate-500">
            {this.state.error?.message ||
              'Se produjo un error inesperado al renderizar el panel de métricas.'}
          </p>

          <div className="mt-6 flex items-center gap-3">
            <Button variant="primary" size="sm" onClick={this.handleReset}>
              <RefreshCw className="h-3.5 w-3.5" />
              Recargar aplicación
            </Button>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}
