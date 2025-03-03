import { Product } from "@/database/useShoppingList";
import { create } from "zustand";



type StoreState = {
  selectedProduct: Product | null;
  setSelectedProduct: (product: Product | null) => void;
  removeSelectedProduct: () => void;
};

const useStore = create<StoreState>((set) => ({
  selectedProduct: null,
  setSelectedProduct: (product) => set({ selectedProduct: product }),
  removeSelectedProduct: () => set({ selectedProduct: null }),
}));

export default useStore;
