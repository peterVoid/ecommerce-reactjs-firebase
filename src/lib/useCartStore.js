import create from "zustand";
import { persist } from "zustand/middleware";

// Define the cart store with persist middleware
export const useCartStore = create(
  persist(
    (set) => ({
      cart: [],
      addToCart: (product) =>
        set((state) => {
          if (!product) return { cart: state.cart };

          const existingProductIndex = state.cart.findIndex(
            (item) => item.id === product.id
          );

          if (existingProductIndex !== -1) {
            const updatedCart = state.cart.map((item, index) => {
              if (index === existingProductIndex) {
                return { ...item, quantity: item.quantity + product.quantity };
              }
              return item;
            });
            return { cart: updatedCart };
          }

          return {
            cart: [...state.cart, { ...product, quantity: product.quantity }],
          };
        }),
      updateQuantity: (id) =>
        set((state) => {
          const updatedCart = state.cart.map((item) =>
            item.id === id ? { ...item, quantity: item.quantity + 1 } : item
          );
          return { cart: updatedCart };
        }),
      decreaseQuantity: (id) =>
        set((state) => {
          const data = state.cart.find((item) => item.id === id);
          if (data.quantity - 1 < 1) {
            const newCart = state.cart.map((item) =>
              item.id === id ? { ...item, quantity: 1 } : item
            );
            return { cart: newCart };
          } else {
            const updatedCart = state.cart.map((item) =>
              item.id === id ? { ...item, quantity: item.quantity - 1 } : item
            );
            return { cart: updatedCart };
          }
        }),
      removeFromCart: (id) =>
        set((state) => {
          let ad = state.cart.filter((item) => item.id !== id);
          return { cart: ad };
        }),
    }),
    {
      name: "cart-storage",
      getStorage: () => localStorage,
    }
  )
);
