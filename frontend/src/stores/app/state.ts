import type { Notify } from '@/types/elements/notify'
import type { User, Menu, CartItem } from '@/types/fos'

export const state = () => ({
  apiLoading: false as boolean,
  toasts: [] as Notify[],
  user: JSON.parse(localStorage.getItem('user') || '{}') as User,
  cart: JSON.parse(localStorage.getItem('cart') || '[]') as CartItem[],
  menuItems: {} as Menu,
  searchVal: '' as string,
  scrollTargetCategory: null as string|number|null,

})

export type State = ReturnType<typeof state>






// export const useUserStore = defineStore('user', {
//   state: () => ({
//     name: localStorage.getItem('name') || '',
//     token: localStorage.getItem('token') || '',
//   }),
//   actions: {
//     setToken(newToken) {
//       this.token = newToken
//       localStorage.setItem('token', newToken)
//     },
//     setName(newName) {
//       this.name = newName
//       localStorage.setItem('name', newName)
//     }
//   }
// })
