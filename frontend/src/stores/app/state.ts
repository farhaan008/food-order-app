import type { Notify } from '@/types/elements/notify'
export interface IAppState {
  isLoading: boolean
  toasts: Notify[]
}

export const state = (): IAppState => ({
  isLoading: false,
  toasts: [],
})
