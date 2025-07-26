import type { IAppState } from './state'
import type { Notify } from '@/types/elements/notify'

export const actions = {
  setLoading(this: IAppState, isLoading: boolean): void {
    this.isLoading = isLoading
  },
  showToast(this: IAppState, toast: Notify): void {
    if (toast) {
      this.toasts?.push(toast)
    }
  },
  clearToast(this: IAppState, index: number): void {
    if (this.toasts && index >= 0 && index < this.toasts.length) {
      this.toasts.splice(index ?? 0, 1)
    }
  },
}
