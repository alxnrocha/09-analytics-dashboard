import { DashboardLayout } from './components/layout/DashboardLayout';
import { Card } from './components/ui/Card';
import { Badge } from './components/ui/Badge';
import { Button } from './components/ui/Button';

export default function App() {
  return (
    <DashboardLayout>
      <div className="space-y-6">
        {/* Placeholder Shell Content */}
        <Card className="border-indigo-100 bg-white/80 backdrop-blur-xs">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-lg font-semibold text-slate-900">Panel de Métricas</h2>
                <Badge tone="brand">Milestone 2</Badge>
              </div>
              <p className="mt-1 text-sm text-slate-500">
                Estructura del dashboard configurada. Los componentes de KPI, gráficos y tabla de
                datos se integrarán en las próximas etapas.
              </p>
            </div>
            <div className="flex items-center gap-2">
              <Button variant="secondary" size="sm">
                Documentación
              </Button>
              <Button size="sm">Ver Métricas</Button>
            </div>
          </div>
        </Card>

        {/* Grid Preview Placeholders */}
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {['Ingresos', 'Pedidos', 'Clientes', 'Ticket medio'].map((title) => (
            <Card
              key={title}
              className="flex h-28 items-center justify-center border-dashed border-slate-200 bg-white/40"
            >
              <span className="text-sm font-medium text-slate-400">KPI: {title}</span>
            </Card>
          ))}
        </div>
      </div>
    </DashboardLayout>
  );
}
