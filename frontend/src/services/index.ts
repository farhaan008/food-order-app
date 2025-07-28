import { Axios } from '@/plugins/http-common'

// const END_POINT = 'core/'

class Core extends Axios {
  getMenu = (): Promise<any> => this.request('get', `menu`, true);

  getPaymentQr = (params:any): Promise<any> => {
    return this.request('post', 'generate-qr', true, params)
  }
}

export const COREAPI = new Core()
