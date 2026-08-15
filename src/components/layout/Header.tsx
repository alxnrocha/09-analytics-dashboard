import type { FC } from 'react';
import { Search, Bell, Menu } from 'lucide-react';
import { useFilterStore } from '../../store/filterStore';

interface HeaderProps {
  onMenuToggle?: () => void;
  userName?: string;
  userAvatar?: string;
}

export const Header: FC<HeaderProps> = ({
  onMenuToggle,
  userName = 'María',
  userAvatar = 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=120&q=80',
}) => {
  const { searchQuery, setSearchQuery } = useFilterStore();

  return (
    <header className="flex flex-col gap-4 py-4 sm:py-6 md:flex-row md:items-center md:justify-between">
      {/* Title & Mobile Toggle */}
      <div className="flex items-center gap-3">
        {onMenuToggle && (
          <button
            type="button"
            onClick={onMenuToggle}
            className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-slate-200 bg-white text-slate-600 shadow-xs hover:bg-slate-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500 lg:hidden"
            aria-label="Abrir menú lateral"
          >
            <Menu className="h-5 w-5" />
          </button>
        )}

        <div>
          <h1 className="text-xl font-bold tracking-tight text-slate-900 sm:text-2xl md:text-3xl">
            ¡Hola, {userName}! 👋
          </h1>
          <p className="mt-0.5 text-xs text-slate-500 sm:text-sm">
            Aquí tienes un resumen de tu tienda hoy
          </p>
        </div>
      </div>

      {/* Actions: Search, Notifications & Avatar */}
      <div className="flex w-full items-center justify-between gap-3 sm:w-auto sm:justify-end">
        {/* Search Bar */}
        <div className="relative flex-1 sm:w-48 md:w-56 sm:flex-initial">
          <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3.5 text-slate-400">
            <Search className="h-4 w-4" />
          </div>
          <input
            type="search"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Buscar..."
            className="h-10 w-full rounded-full border border-slate-200/90 bg-white pr-4 pl-9 text-xs text-slate-800 placeholder-slate-400 shadow-xs transition-all focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20 focus:outline-none sm:text-sm sm:focus:w-60"
          />
        </div>

        <div className="flex items-center gap-2 sm:gap-3 shrink-0">
          {/* Notifications Button */}
          <button
            type="button"
            className="relative flex h-10 w-10 items-center justify-center rounded-full border border-slate-200/90 bg-white text-slate-600 shadow-xs transition-colors hover:bg-slate-50 hover:text-slate-900 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500"
            aria-label="Notificaciones"
          >
            <Bell className="h-4 w-4" />
            <span className="absolute -top-0.5 -right-0.5 flex h-4 w-4 items-center justify-center rounded-full bg-rose-500 text-[10px] font-bold text-white ring-2 ring-white">
              1
            </span>
          </button>

          {/* User Profile Avatar */}
          <div className="flex items-center">
            <img
              src={userAvatar}
              alt={userName}
              className="h-10 w-10 rounded-full object-cover shadow-xs ring-2 ring-indigo-50"
            />
          </div>
        </div>
      </div>
    </header>
  );
};
