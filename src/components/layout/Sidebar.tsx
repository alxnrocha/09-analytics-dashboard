import type { FC } from 'react';
import { Home, TrendingUp, Package, Users, BarChart3, Settings, X, Sun } from 'lucide-react';

interface NavItem {
  label: string;
  icon: typeof Home;
  href: string;
  isActive?: boolean;
}

const navItems: NavItem[] = [
  { label: 'Inicio', icon: Home, href: '#inicio', isActive: true },
  { label: 'Ventas', icon: TrendingUp, href: '#ventas' },
  { label: 'Productos', icon: Package, href: '#productos' },
  { label: 'Clientes', icon: Users, href: '#clientes' },
  { label: 'Reportes', icon: BarChart3, href: '#reportes' },
  { label: 'Configuración', icon: Settings, href: '#configuracion' },
];

interface SidebarProps {
  isOpen?: boolean;
  onClose?: () => void;
}

export const Sidebar: FC<SidebarProps> = ({ isOpen = false, onClose }) => {
  return (
    <>
      {/* Mobile backdrop overlay */}
      {isOpen && (
        <div
          role="presentation"
          className="fixed inset-0 z-40 bg-slate-900/20 backdrop-blur-xs lg:hidden"
          onClick={onClose}
        />
      )}

      {/* Sidebar container */}
      <aside
        className={`fixed top-0 bottom-0 left-0 z-50 flex w-64 flex-col border-r border-slate-100 bg-white p-6 transition-transform duration-200 ease-in-out lg:static lg:z-auto lg:translate-x-0 ${
          isOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        {/* Brand Header */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-amber-100 text-amber-500 shadow-xs">
              <Sun className="h-6 w-6 fill-amber-400 stroke-amber-500" />
            </div>
            <span className="text-xl font-bold tracking-tight text-slate-900">SunnyShop</span>
          </div>

          {/* Close button on mobile */}
          {onClose && (
            <button
              type="button"
              onClick={onClose}
              className="rounded-lg p-1.5 text-slate-400 hover:bg-slate-100 hover:text-slate-600 lg:hidden"
              aria-label="Cerrar menú lateral"
            >
              <X className="h-5 w-5" />
            </button>
          )}
        </div>

        {/* Navigation items */}
        <nav className="mt-8 flex flex-1 flex-col gap-1.5" aria-label="Navegación principal">
          {navItems.map((item) => {
            const Icon = item.icon;
            const activeClasses = item.isActive
              ? 'bg-indigo-50/80 text-indigo-600 font-semibold shadow-xs'
              : 'text-slate-500 hover:bg-slate-50 hover:text-slate-800 font-medium';

            return (
              <a
                key={item.label}
                href={item.href}
                className={`flex items-center gap-3.5 rounded-2xl px-4 py-3 text-sm transition-colors ${activeClasses}`}
              >
                <Icon
                  className={`h-5 w-5 ${item.isActive ? 'text-indigo-600' : 'text-slate-400'}`}
                />
                <span>{item.label}</span>
              </a>
            );
          })}
        </nav>
      </aside>
    </>
  );
};
