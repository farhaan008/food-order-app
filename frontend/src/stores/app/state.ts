import type { Notify } from '@/types/elements/notify'

export const state = () => ({
  apiLoading: false as boolean,
  toasts: [] as Notify[],
  scrollTargetCategory: null as string|number|null,
  searchVal: '' as string,
  menuItems: {} as any,
  cart: [] as any[],

})

export type State = ReturnType<typeof state>
