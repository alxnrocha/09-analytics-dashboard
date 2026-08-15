import { DashboardLayout } from './components/layout/DashboardLayout';
import { Card } from './components/ui/Card';
import { Badge } from './components/ui/Badge';
import { Button } from './components/ui/Button';
import { useDashboardData } from './hooks/useDashboardData';
import { RefreshCw, AlertCircle } from 'lucide-react';

export default function App() {
  const { data, isLoading, isError, error, refetch, isFetching } = useDashboardData();

  return (
    <DashboardLayout>
      <div className="space-y-6">
        {/* Status & Actions Bar */}
        <Card className="border-indigo-100 bg-white/80 backdrop-blur-xs">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-lg font-semibold text-slate-900">Panel de Métricas</h2>
                <Badge tone="brand">TanStack Query v5</Badge>
                {isFetching && !isLoading && <Badge tone="info">Actualizando...</Badge>}
              </div>
              <p className="mt-1 text-sm text-slate-500">
                Data fetching reactivo configurado con TanStack Query y Mock API.
              </p>
            </div>
            <div className="flex items-center gap-2">
              <Button variant="secondary" size="sm" onClick={() => refetch()} disabled={isFetching}>
                <RefreshCw className={`h-3.5 w-3.5 ${isFetching ? 'animate-spin' : ''}`} />
                Recargar datos
              </Button>
            </div>
          </div>
        </Card>

        {/* Loading State */}
        {isLoading && (
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {[1, 2, 3, 4].map((n) => (
              <Card
                key={n}
                className="flex h-28 items-center justify-center animate-pulse bg-white/60"
              >
                <span className="text-sm font-medium text-slate-400">Cargando métricas...</span>
              </Card>
            ))}
          </div>
        )}

        {/* Error State */}
        {isError && (
          <Card className="border-red-200 bg-red-50/50">
            <div className="flex items-start gap-3">
              <AlertCircle className="h-5 w-5 text-red-500 shrink-0 mt-0.5" />
              <div className="flex-1">
                <h3 className="text-sm font-semibold text-red-800">Error al cargar datos</h3>
                <p className="mt-0.5 text-sm text-red-600">
                  {error?.message || 'No se pudieron recuperar los datos del dashboard.'}
                </p>
                <div className="mt-3">
                  <Button variant="danger" size="sm" onClick={() => refetch()}>
                    Reintentar
                  </Button>
                </div>
              </div>
            </div>
          </Card>
        )}

        {/* Data Loaded / Placeholders */}
        {!isLoading && !isError && data && (
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
            <Card className="flex flex-col justify-between border-slate-100 bg-white">
              <span className="text-xs font-semibold uppercase tracking-wider text-slate-400">
                Pedidos Totales
              </span>
              <span className="text-2xl font-bold text-slate-900">{data.orders.length}</span>
              <span className="text-xs text-emerald-600 font-medium">
                Listo para cálculo de KPIs
              </span>
            </Card>

            <Card className="flex flex-col justify-between border-slate-100 bg-white">
              <span className="text-xs font-semibold uppercase tracking-wider text-slate-400">
                Productos Activos
              </span>
              <span className="text-2xl font-bold text-slate-900">{data.products.length}</span>
              <span className="text-xs text-slate-500">
                {data.categories.length} categorías registradas
              </span>
            </Card>

            <Card className="flex flex-col justify-between border-slate-100 bg-white">
              <span className="text-xs font-semibold uppercase tracking-wider text-slate-400">
                Clientes
              </span>
              <span className="text-2xl font-bold text-slate-900">{data.customers.length}</span>
              <span className="text-xs text-slate-500">Base de clientes sincronizada</span>
            </Card>

            <Card className="flex flex-col justify-between border-slate-100 bg-white">
              <span className="text-xs font-semibold uppercase tracking-wider text-slate-400">
                Estado de Caché
              </span>
              <span className="text-sm font-semibold text-indigo-600">
                Fresca (5 min staleTime)
              </span>
              <span className="text-xs text-slate-400">Query Key: ['dashboard']</span>
            </Card>
          </div>
        )}
      </div>
    </DashboardLayout>
  );
}
