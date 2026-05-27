import { create } from 'zustand';

export const useHarvestStore = create((set) => ({
  // Array of string IDs (e.g., ['WETH', 'SOL'])
  selectedHoldings: [],

  // Toggle a single row
  toggleHolding: (coinId) => set((state) => ({
    selectedHoldings: state.selectedHoldings.includes(coinId)
      ? state.selectedHoldings.filter((id) => id !== coinId)
      : [...state.selectedHoldings, coinId],
  })),

  // Select all or deselect all
  toggleAll: (allCoinIds) => set((state) => ({
    selectedHoldings: state.selectedHoldings.length === allCoinIds.length ? [] : allCoinIds,
  })),

  // Clear selections
  clearAll: () => set({ selectedHoldings: [] }),
}));