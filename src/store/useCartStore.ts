import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { CartItem, Product, ProductColor } from '@/types';
import { SOL_PRICE_USD } from '@/data/products';

interface CartState {
  items: CartItem[];
  isOpen: boolean;
  currency: 'USDC' | 'SOL';
  
  // Actions
  addItem: (product: Product, size: string, color: ProductColor, quantity?: number) => void;
  removeItem: (id: string) => void;
  updateQuantity: (id: string, quantity: number) => void;
  clearCart: () => void;
  setIsOpen: (isOpen: boolean) => void;
  toggleCart: () => void;
  setCurrency: (currency: 'USDC' | 'SOL') => void;
  
  // Computations
  getTotalItems: () => number;
  getTotalUsdc: () => number;
  getTotalSolApprox: () => number;
}

export const useCartStore = create<CartState>()(
  persist(
    (set, get) => ({
      items: [],
      isOpen: false,
      currency: 'USDC',

      addItem: (product: Product, size: string, color: ProductColor, quantity = 1) => {
        const itemKey = `${product.id}-${size}-${color.name.toLowerCase().replace(/\s+/g, '-')}`;
        const existingItems = get().items;
        const existingIndex = existingItems.findIndex(i => i.id === itemKey);

        if (existingIndex > -1) {
          const updatedItems = [...existingItems];
          updatedItems[existingIndex].quantity += quantity;
          set({ items: updatedItems, isOpen: true });
        } else {
          const newItem: CartItem = {
            id: itemKey,
            productId: product.id,
            name: product.name,
            slug: product.slug,
            price_usdc: product.price_usdc,
            size,
            color,
            quantity,
            image: product.images[0],
          };
          set({ items: [...existingItems, newItem], isOpen: true });
        }
      },

      removeItem: (id: string) => {
        set({ items: get().items.filter(item => item.id !== id) });
      },

      updateQuantity: (id: string, quantity: number) => {
        if (quantity <= 0) {
          get().removeItem(id);
          return;
        }
        set({
          items: get().items.map(item => 
            item.id === id ? { ...item, quantity } : item
          )
        });
      },

      clearCart: () => {
        set({ items: [] });
      },

      setIsOpen: (isOpen: boolean) => set({ isOpen }),

      toggleCart: () => set(state => ({ isOpen: !state.isOpen })),

      setCurrency: (currency: 'USDC' | 'SOL') => set({ currency }),

      getTotalItems: () => {
        return get().items.reduce((sum, item) => sum + item.quantity, 0);
      },

      getTotalUsdc: () => {
        return +(get().items.reduce((sum, item) => sum + item.price_usdc * item.quantity, 0)).toFixed(2);
      },

      getTotalSolApprox: () => {
        const totalUsdc = get().getTotalUsdc();
        return +(totalUsdc / SOL_PRICE_USD).toFixed(4);
      },
    }),
    {
      name: 'shoppy-cart-storage',
      partialize: (state) => ({ items: state.items, currency: state.currency }),
    }
  )
);
