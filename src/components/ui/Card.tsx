import type { ReactNode } from 'react';

interface CardProps {
  children: ReactNode;
  className?: string;
  padded?: boolean;
}

export const Card: React.FC<CardProps> = ({ children, className = '', padded = true }) => {
  return (
    <div
      className={`rounded-xl border border-slate-200 bg-surface shadow-sm ${padded ? 'p-6' : ''} ${className}`}
    >
      {children}
    </div>
  );
};
