import type { Notify } from '@/types/elements/notify'
import type { State } from './state';

export const getters = {
  isLoading: (state: State): boolean => state.isLoading,
  getToasts: (state: State): Notify[] => state.toasts,

  getMenuItems: (state: State): any[] => {
    return state.menuItems || [];
  },
  cartTotal: (state: State) => (state.cart ?? []).reduce((total, item) => total + item.price * item.quantity, 0),
  cartCount: (state: State) => (state.cart ?? []).reduce((count, item) => count + item.quantity, 0),
  getItemQuantity: (state: State) => {
    return (id: number) => {
      const item = state.cart.find(i => i.id === id)
      return item ? item.quantity : 0
    }
  }
};
