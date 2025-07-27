import type { Notify } from '@/types/elements/notify'
import type { State } from './state'

export const actions = {
  setLoading(this: State, isLoading: boolean): void {
    this.isLoading = isLoading
  },
  showToast(this: State, toast: Notify): void {
    if (toast) {
      this.toasts?.push(toast)
    }
  },
  clearToast(this: State, index: number): void {
    if (this.toasts && index >= 0 && index < this.toasts.length) {
      this.toasts.splice(index ?? 0, 1)
    }
  },

  setMenuItems(this: State, items: any[]): void {
    console.log('Setting menu items:', items)
    this.menuItems = items
  },
  addToCart(this: State, item: any): void {
    const existing = this.cart?.find((f) => f.id === item.id)
    if (existing) {
      existing.quantity++
    } else {
      this.cart?.push({ ...item, quantity: 1 })
    }
  },
  removeFromCart(this: State, id: any): void {
    if (!this.cart || this.cart.length === 0) return
    const item = this.cart.find((f) => f.id === id)
    if (item) {
      if (item.quantity > 1) {
        item.quantity--
      } else {
        this.cart = this.cart.filter((f) => f.id !== id)
      }
    }
  },
  clearCart(this: State): void {
    this.cart = []
  },
}
