import type { IAppState } from './state'
import type { Notify } from '@/types/elements/notify'

export const getters = {
  isLoading: (state: IAppState): boolean => state.isLoading,
  getToasts: (state: IAppState): Notify[] => state.toasts,
}
