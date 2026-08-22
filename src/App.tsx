import { DashboardLayout } from './components/layout/DashboardLayout';
import { Badge } from './components/ui/Badge';
import { Button } from './components/ui/Button';
import { ErrorState } from './components/ui/ErrorState';
import { EmptyState } from './components/ui/EmptyState';
import { FilterBar } from './components/dashboard/FilterBar';
import { KpiGrid } from './components/dashboard/KpiGrid';
import { RevenueChart } from './components/dashboard/RevenueChart';
import { SalesDistributionDonut } from './components/dashboard/SalesDistributionDonut';
import { CategoryBarChart } from './components/dashboard/CategoryBarChart';
import { TopProductsTable } from './components/dashboard/TopProductsTable';
import { useDashboardData } from './hooks/useDashboardData';
import { useFilterStore } from './store/filterStore';
import {
  filterDashboardData,
  computeKpiMetrics,
  computeCategoryBreakdown,
  computeTopProducts,
} from './utils/metrics';
import { RefreshCw, SearchX } from 'lucide-react';

export default function App() {
  const { data, isLoading, isError, error, refetch, isFetching } = useDashboardData();

  const { selectedCategory, datePreset, searchQuery, resetFilters } = useFilterStore();

  const filteredData = data
    ? filterDashboardData(data, {
        selectedCategory,
        datePreset,
        searchQuery,
      })
    : null;

  const metrics = filteredData ? computeKpiMetrics(filteredData) : null;
  const categoriesBreakdown = filteredData ? computeCategoryBreakdown(filteredData) : [];
  const topProducts = filteredData ? computeTopProducts(filteredData) : [];

  const hasNoResults =
    !isLoading &&
    !isError &&
    filteredData &&
    (filteredData.orders.length === 0 || topProducts.length === 0);

  return (
    <DashboardLayout>
      <div className="space-y-6">
        {/* Filter Bar & Quick Controls */}
        {data && <FilterBar categories={data.categories} />}

        {/* Status Bar */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Badge tone="brand">Panel en vivo</Badge>
            {isFetching && !isLoading && <Badge tone="info">Sincronizando...</Badge>}
            {selectedCategory !== 'all' && <Badge tone="warning">Filtro de categoría activo</Badge>}
            {searchQuery && <Badge tone="neutral">Búsqueda: "{searchQuery}"</Badge>}
          </div>
          <Button variant="secondary" size="sm" onClick={() => refetch()} disabled={isFetching}>
            <RefreshCw className={`h-3.5 w-3.5 ${isFetching ? 'animate-spin' : ''}`} />
            Actualizar
          </Button>
        </div>

        {/* Error State */}
        {isError && (
          <ErrorState
            title="Error al cargar las métricas del dashboard"
            message={
              error?.message ||
              'No se pudieron sincronizar los datos de ventas simulados. Puedes reintentar la conexión.'
            }
            onRetry={() => refetch()}
            isRetrying={isFetching}
          />
        )}

        {/* Empty State when filters yield 0 results */}
        {hasNoResults && (
          <EmptyState
            title="No se encontraron pedidos ni métricas"
            description="Ningún registro coincide con los filtros aplicados (categoría, rango temporal o búsqueda). Prueba a restablecer los filtros."
            icon={SearchX}
            actionLabel="Restablecer filtros"
            onAction={resetFilters}
          />
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

        {!isLoading && !hasNoResults && metrics && <KpiGrid metrics={metrics} />}

        {/* Charts & Tables when data is available */}
        {!hasNoResults && (
          <>
            {/* Charts Row 1: Time-Series Revenue + Donut Distribution */}
            <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
              <div className="lg:col-span-2">
                <RevenueChart orders={filteredData?.orders || []} isLoading={isLoading} />
              </div>

              <div className="lg:col-span-1">
                <SalesDistributionDonut
                  categories={categoriesBreakdown}
                  totalRevenue={metrics?.revenue || 0}
                  isLoading={isLoading}
                />
              </div>
            </div>

            {/* Charts Row 2: Category Breakdown Bar Chart + Top Products Table */}
            <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
              <div className="lg:col-span-2">
                <CategoryBarChart categories={categoriesBreakdown} isLoading={isLoading} />
              </div>

              <div className="lg:col-span-1">
                <TopProductsTable products={topProducts} isLoading={isLoading} />
              </div>
            </div>
          </>
        )}
      </div>
    </DashboardLayout>
  );
}
