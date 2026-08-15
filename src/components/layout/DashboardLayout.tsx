import { useState, type FC, type ReactNode } from 'react';
import { Sidebar } from './Sidebar';
import { Header } from './Header';

interface DashboardLayoutProps {
  children: ReactNode;
}

export const DashboardLayout: FC<DashboardLayoutProps> = ({ children }) => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  return (
    <div className="flex min-h-screen bg-[#f6f7fd]">
      {/* Sidebar Navigation */}
      <Sidebar isOpen={isSidebarOpen} onClose={() => setIsSidebarOpen(false)} />

      {/* Main Content Area */}
      <div className="flex min-w-0 flex-1 flex-col">
        <div className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
          <Header onMenuToggle={() => setIsSidebarOpen(true)} />
          <main className="pb-10">{children}</main>
        </div>
      </div>
    </div>
  );
};
