export default function App() {
  return (
    <div className="min-h-screen p-8">
      <header className="mb-8 max-w-2xl">
        <h1 className="text-2xl font-bold">Analytics Dashboard</h1>
        <p className="text-slate-500">Panel de métricas en construcción.</p>
      </header>

      <div className="grid max-w-2xl grid-cols-2 gap-4 sm:grid-cols-4">
        <div className="rounded-lg bg-brand p-4 text-sm font-medium text-white">Brand</div>
        <div className="rounded-lg bg-success p-4 text-sm font-medium text-white">Success</div>
        <div className="rounded-lg bg-warning p-4 text-sm font-medium text-white">Warning</div>
        <div className="rounded-lg bg-danger p-4 text-sm font-medium text-white">Danger</div>
      </div>

      <div className="mt-4 grid max-w-2xl grid-cols-2 gap-4 sm:grid-cols-4">
        <div className="rounded-lg border border-slate-200 bg-surface p-4 text-sm">Surface</div>
        <div className="rounded-lg bg-brand-soft p-4 text-sm font-medium text-brand">
          Brand soft
        </div>
        <div className="rounded-lg bg-info p-4 text-sm font-medium text-white">Info</div>
        <div className="rounded-lg border border-dashed border-slate-300 p-4 text-sm text-slate-400">
          Empty
        </div>
      </div>
    </div>
  );
}
