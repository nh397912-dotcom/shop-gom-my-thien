
export interface Product {
  id: number;
  name: string;
  description: string;
  imageUrl: string;
  salePercent?: number;
  isBestSeller?: boolean;
  isNew?: boolean;
}

export interface CartItem extends Product {
  quantity: number;
  price: number;
}
