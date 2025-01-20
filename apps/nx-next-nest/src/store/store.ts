import { create, StateCreator } from 'zustand';
import { devtools, persist } from 'zustand/middleware';
import { InventoryItem } from '@animando/inventory';

type CounterSlice = {
  counter: number;
  increase: (by: number) => void;
};
type InventorySlice = {
  items: InventoryItem[];
  setInventory: (items: InventoryItem[]) => void;
};

const createCounterSlice: StateCreator<CounterSlice> = (set) => ({
  counter: 8,
  increase: (by) => set((state) => ({ counter: state.counter + by }), false),
});
const createInventorySlice: StateCreator<InventorySlice> = (set) => ({
  items: [],
  setInventory: (items: InventoryItem[]) => set(() => ({ items })),
});

export const usePersistentStore = create<InventorySlice>()(
  devtools(
    persist(
      (...args) => ({
        ...createInventorySlice(...args),
      }),
      {
        name: 'persistent-store',
      }
    )
  )
);
export const useStore = create<CounterSlice>()(
  devtools(
    (...args) => ({
      ...createCounterSlice(...args),
    }),
    {
      name: 'ephemeral-store',
    }
  )
);
