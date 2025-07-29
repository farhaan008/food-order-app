import type { Notify } from '@/types/elements/notify'
import type { State } from './state'
import { COREAPI } from '@/services'
import type { Menu, MenuItem, User } from '@/types/fos'

export const actions = {
  setLoading(this: State, isLoading: boolean): void {
    this.apiLoading = isLoading
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

  async fetchMenuItems(this: State): Promise<any> {
    await COREAPI.getMenu().then((response) => {
      if(response.statusCode === 200 && response.data){
        this.menuItems = response.data || []
      }
    }).catch((error) => {
      console.error('Error fetching menu:', error)
    })
  },

  setMenuItems(this: State, items: Menu): void {
    console.log('Setting menu items:', items)
    this.menuItems = items
  },
  addToCart(this: State, item: MenuItem): void {
    const existing = this.cart?.find((f) => f.id === item.id)
    if (existing) {
      existing.quantity++
    } else {
      this.cart?.push({ ...item, quantity: 1 })
    }
    localStorage.setItem('cart', JSON.stringify(this.cart))
  },
  removeFromCart(this: State, id: string|number): void {
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
    this.cart = [],
    localStorage.removeItem('user')
    localStorage.removeItem('cart')
  },

  setSearchVal(this:State, searchVal:string): void {
    this.searchVal = searchVal;
  },

  triggerScroll(this:State, categoryId:string|number) {
    this.scrollTargetCategory = categoryId
  },
  clearScrollTarget(this:State) {
    this.scrollTargetCategory = null;
  },

  setUser(this:State, user:User) {
    this.user = user;
    localStorage.setItem('user', JSON.stringify(user))
  }

}
