import { store } from '@/stores'

export const showToast = (msg: string, isSuccess: boolean): void => {
  store.app.showToast({
    type: isSuccess ? 'success' : 'error',
    title: isSuccess ? 'Success' : 'Error',
    message: msg,
  })
  // store.dispatch('app/showToast', {
  //   type: isSuccess ? 'success' : 'error',
  //   title: isSuccess ? 'Success' : 'Error',
  //   description: msg,
  // })
}
