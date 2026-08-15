import { create } from 'zustand';

export type DatePreset = '7d' | '30d' | '90d' | 'all';

interface FilterState {
  selectedCategory: string;
  datePreset: DatePreset;
  searchQuery: string;
  setSelectedCategory: (categoryId: string) => void;
  setDatePreset: (preset: DatePreset) => void;
  setSearchQuery: (query: string) => void;
  resetFilters: () => void;
}

export const useFilterStore = create<FilterState>((set) => ({
  selectedCategory: 'all',
  datePreset: '30d',
  searchQuery: '',
  setSelectedCategory: (selectedCategory) => set({ selectedCategory }),
  setDatePreset: (datePreset) => set({ datePreset }),
  setSearchQuery: (searchQuery) => set({ searchQuery }),
  resetFilters: () =>
    set({
      selectedCategory: 'all',
      datePreset: '30d',
      searchQuery: '',
    }),
}));
