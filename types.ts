
export interface Product {
  id: number;
  name: string;
  description: string;
  imageUrl: string;
  price: number;
  salePercent?: number;
  isBestSeller?: boolean;
  isNew?: boolean;
}

export interface CartItem extends Product {
  quantity: number;
}
