import type { Notify } from '@/types/elements/notify'

export const state = () => ({
  isLoading: false as boolean,
  toasts: [] as Notify[],
  menuItems: [] as any[],
  cart: [] as any[],
})

export type State = ReturnType<typeof state>;
