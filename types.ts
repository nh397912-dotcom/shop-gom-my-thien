
export interface Product {
  id: number;
  name: string;
  description: string;
  imageUrl: string;
}

export interface CartItem extends Product {
  quantity: number;
  price: number;
}
