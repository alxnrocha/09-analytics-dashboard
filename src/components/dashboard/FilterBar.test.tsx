import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, beforeEach } from 'vitest';
import { FilterBar } from './FilterBar';
import { useFilterStore } from '../../store/filterStore';
import type { Category } from '../../types/analytics';

const mockCategories: Category[] = [
  { id: 'cat-1', name: 'Electrónica', slug: 'electronica' },
  { id: 'cat-2', name: 'Moda', slug: 'moda' },
];

describe('FilterBar Component', () => {
  beforeEach(() => {
    useFilterStore.getState().resetFilters();
  });

  it('renders all category pills and active "Todas"', () => {
    render(<FilterBar categories={mockCategories} />);

    const todasBtn = screen.getByRole('button', { name: 'Todas' });
    expect(todasBtn).toBeInTheDocument();
    expect(todasBtn).toHaveAttribute('aria-pressed', 'true');

    expect(screen.getByRole('button', { name: 'Electrónica' })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Moda' })).toBeInTheDocument();
  });

  it('changes active category when clicked', () => {
    render(<FilterBar categories={mockCategories} />);

    const modaBtn = screen.getByRole('button', { name: 'Moda' });
    fireEvent.click(modaBtn);

    expect(useFilterStore.getState().selectedCategory).toBe('cat-2');
  });

  it('updates date preset when clicked', () => {
    render(<FilterBar categories={mockCategories} />);

    const preset7dBtn = screen.getByRole('button', { name: '7d' });
    fireEvent.click(preset7dBtn);

    expect(useFilterStore.getState().datePreset).toBe('7d');
  });
});
