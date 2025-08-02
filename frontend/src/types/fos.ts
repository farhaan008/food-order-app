export interface Menu {
  [key: string]: MenuItem[]
}

export interface MenuItem {
  id: number
  name: string
  description: string
  price: number
  imageUrl: string
  categoryId: number | null
  categoryName: string | null
  available: boolean
  sizeId?: number
  sizes?: Sizes[],
  prices?: Prices[]
}

export interface Sizes {
  sizeId: number,
  size: string
}
export interface Prices {
  sizeId: number,
  price: number
}

export interface CartItem extends MenuItem {
  quantity: number
}

export interface User {
  name: string | null,
  mobile?: string | number | null
}

export interface Order {
  name?: string,
  mobile?: number | string,
  items: MenuItem[]
  [key: string]: any
}

export interface KitchenStatus {
  kitchen_status: 'queued' | 'preparing' | 'ready' | 'served';
  [key: string]: any;
}
export type TypeKitchenStatus = 'queued' | 'preparing' | 'ready' | 'served';

export interface OrderItem {
  id: number;
  item_name: string;
  item_size: string | null;
  quantity: number;
  kitchen_status: TypeKitchenStatus;
  _isReady?: boolean;
}

export interface KitchenDashboard {
  order_id: number;
  created_at: string | Date;
  items: OrderItem[];
}

export interface ApiResponse {
  status: 'success' | 'error' | string;
  message: string;
  data: {
    order_id: string;
    item_id: string;
    kitchen_status: 'queued' | 'preparing' | 'ready' | 'served' | string;
  };
  statusCode: number;
}



