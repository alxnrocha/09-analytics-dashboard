import { DashboardLayout } from './components/layout/DashboardLayout';
import { Card } from './components/ui/Card';
import { Badge } from './components/ui/Badge';
import { Button } from './components/ui/Button';
import { KpiGrid } from './components/dashboard/KpiGrid';
import { RevenueChart } from './components/dashboard/RevenueChart';
import { SalesDistributionDonut } from './components/dashboard/SalesDistributionDonut';
import { CategoryBarChart } from './components/dashboard/CategoryBarChart';
import { useDashboardData } from './hooks/useDashboardData';
import { computeKpiMetrics, computeCategoryBreakdown } from './utils/metrics';
import { RefreshCw, AlertCircle } from 'lucide-react';

export default function App() {
  const { data, isLoading, isError, error, refetch, isFetching } = useDashboardData();

  const metrics = data ? computeKpiMetrics(data) : null;
  const categoriesBreakdown = data ? computeCategoryBreakdown(data) : [];

  return (
    <DashboardLayout>
      <div className="space-y-6">
        {/* Status Bar */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Badge tone="brand">Panel en vivo</Badge>
            {isFetching && !isLoading && <Badge tone="info">Sincronizando...</Badge>}
          </div>
          <Button variant="secondary" size="sm" onClick={() => refetch()} disabled={isFetching}>
            <RefreshCw className={`h-3.5 w-3.5 ${isFetching ? 'animate-spin' : ''}`} />
            Actualizar
          </Button>
        </div>

        {/* Error State */}
        {isError && (
          <Card className="border-red-200 bg-red-50/50">
            <div className="flex items-start gap-3">
              <AlertCircle className="mt-0.5 h-5 w-5 shrink-0 text-red-500" />
              <div className="flex-1">
                <h3 className="text-sm font-semibold text-red-800">Error al cargar métricas</h3>
                <p className="mt-0.5 text-sm text-red-600">
                  {error?.message || 'No se pudieron calcular los datos.'}
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

        {/* KPI Cards Grid */}
        {isLoading && (
          <KpiGrid
            isLoading
            metrics={{
              revenue: 0,
              revenueDelta: 0,
              ordersCount: 0,
              ordersDelta: 0,
              customersCount: 0,
              customersDelta: 0,
              averageTicket: 0,
              averageTicketDelta: 0,
            }}
          />
        )}

        {!isLoading && metrics && <KpiGrid metrics={metrics} />}

        {/* Charts Row 1: Time-Series Revenue + Donut Distribution */}
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
          <div className="lg:col-span-2">
            <RevenueChart orders={data?.orders || []} isLoading={isLoading} />
          </div>

          <div className="lg:col-span-1">
            <SalesDistributionDonut
              categories={categoriesBreakdown}
              totalRevenue={metrics?.revenue || 0}
              isLoading={isLoading}
            />
          </div>
        </div>

        {/* Charts Row 2: Category Breakdown Bar Chart + Table Placeholder */}
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
          <div className="lg:col-span-2">
            <CategoryBarChart categories={categoriesBreakdown} isLoading={isLoading} />
          </div>

          <div className="lg:col-span-1">
            <Card className="flex h-full min-h-[300px] items-center justify-center border-dashed border-slate-200 bg-white/50">
              <span className="text-sm font-medium text-slate-400">
                Productos destacados / Tabla (#9)
              </span>
            </Card>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}
