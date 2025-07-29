export interface MenuItem {
  id: number
  name: string
  description: string
  price: number
  imageUrl: string
  categoryId: number | null
  categoryName: string | null
  available: boolean
}

export interface Menu {
  [key: string]: MenuItem[]
}

export interface CartItem extends MenuItem {
  quantity: number
}

export interface User {
  name: string | null,
  mobile?: string | number | null
}
