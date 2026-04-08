import { create } from "zustand";
import { persist } from "zustand/middleware";

// zustand
export const useCartStore = create(
  persist(
    (set, get) => ({
      items: [],

      addProduct: (product) => {
        const items = get().items;
        const exists = items.find((i) => i.productId === product.productId);

        if (exists) {
          // increase quantity if already in cart
          const updated = items.map((i) => {
            if (i.productId === product.productId) {
              return { ...i, quantity: i.quantity + 1 };
            }
            return i;
          });
          set({ items: updated });
        } else {
          // add new item with quantity 1
          set({ items: [...items, { ...product, quantity: 1 }] });
        }
      },

      removeProduct: (productId) => {
        const filtered = get().items.filter((i) => i.productId !== productId);
        set({ items: filtered });
      },

      updateQuantity: (productId, quantity) => {
        if (quantity < 1) return;
        const updated = get().items.map((i) => {
          if (i.productId === productId) {
            return { ...i, quantity };
          }
          return i;
        });
        set({ items: updated });
      },

      clearCart: () => set({ items: [] }),

      getTotalItems: () => {
        return get().items.reduce((sum, i) => sum + i.quantity, 0);
      },

      getTotalPrice: () => {
        return get().items.reduce((sum, i) => sum + i.price * i.quantity, 0);
      },
    }),
    { name: "cart-storage" }
  )
);