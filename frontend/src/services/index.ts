import { Axios } from '@/plugins/http-common'

// const END_POINT = 'core/'

class Core extends Axios {
  getMenu = (): Promise<any> => this.request('get', `menu`, true)
}

export const COREAPI = new Core()
