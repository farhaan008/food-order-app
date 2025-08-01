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


