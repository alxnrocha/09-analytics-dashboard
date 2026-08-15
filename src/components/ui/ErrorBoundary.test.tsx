import { render, screen } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import { ErrorBoundary } from './ErrorBoundary';

const ThrowError = () => {
  throw new Error('Test crash component');
};

describe('ErrorBoundary Component', () => {
  it('renders children when no error occurs', () => {
    render(
      <ErrorBoundary>
        <div>Contenido seguro</div>
      </ErrorBoundary>
    );

    expect(screen.getByText('Contenido seguro')).toBeInTheDocument();
  });

  it('renders fallback alert UI when an error is caught', () => {
    // Suppress React boundary console.error during test
    const spy = vi.spyOn(console, 'error').mockImplementation(() => {});

    render(
      <ErrorBoundary>
        <ThrowError />
      </ErrorBoundary>
    );

    expect(screen.getByText('Algo salió mal en el panel')).toBeInTheDocument();
    expect(screen.getByText('Test crash component')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /Recargar aplicación/i })).toBeInTheDocument();

    spy.mockRestore();
  });
});
