import { Axios } from '@/plugins/http-common'
import type { Order } from '@/types/fos'

class Core extends Axios {

  getMenu = (): Promise<any> => this.request('get', 'api/menu', true);

  createOrder = (params:Order): Promise<any> => {
    return this.request('post', 'api/order', true, params);
  }

  getCustomerOrders = (): Promise<any> => this.request('get', 'api/order-dashboard', true);

  getKitchenOrders = (): Promise<any> => this.request('get', 'api/kitchen-dashboard', true);


  getPaymentQr = (params:any): Promise<any> => {
    return this.request('post', 'api/generate-qr', true, params)
  }

}

export const COREAPI = new Core()
