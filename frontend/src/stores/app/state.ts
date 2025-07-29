import type { Notify } from '@/types/elements/notify'

export const state = () => ({
  apiLoading: false as boolean,
  toasts: [] as Notify[],
  user: {} as any,
  cart: [] as any[],
  menuItems: {} as any,
  searchVal: '' as string,
  scrollTargetCategory: null as string|number|null,

})

export type State = ReturnType<typeof state>
