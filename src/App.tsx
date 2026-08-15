import { Card } from './components/ui/Card';
import { Button } from './components/ui/Button';
import { Badge } from './components/ui/Badge';

export default function App() {
  return (
    <div className="min-h-screen p-8">
      <header className="mb-8 max-w-2xl">
        <h1 className="text-2xl font-bold">Analytics Dashboard</h1>
        <p className="text-slate-500">Panel de métricas en construcción.</p>
      </header>

      <Card className="max-w-2xl">
        <div className="flex flex-wrap items-center gap-3">
          <Badge tone="brand">Brand</Badge>
          <Badge tone="success">Success</Badge>
          <Badge tone="warning">Warning</Badge>
          <Badge tone="danger">Danger</Badge>
          <Badge tone="info">Info</Badge>
          <Badge>Neutral</Badge>
        </div>

        <div className="mt-4 flex flex-wrap items-center gap-3">
          <Button>Primary</Button>
          <Button variant="secondary">Secondary</Button>
          <Button variant="ghost">Ghost</Button>
          <Button variant="danger">Danger</Button>
          <Button isLoading>Loading</Button>
        </div>
      </Card>
    </div>
  );
}
