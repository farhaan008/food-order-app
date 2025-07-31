import { Axios } from '@/plugins/http-common'
import type { Order } from '@/types/fos'

class Core extends Axios {
  getMenu = (): Promise<any> => this.request('get', `menu`, true);

  getPaymentQr = (params:any): Promise<any> => {
    return this.request('post', 'generate-qr', true, params)
  }
  createOrder = (params:Order): Promise<any> => {
    return this.request('post', 'order', true, params);
  }
}

export const COREAPI = new Core()
