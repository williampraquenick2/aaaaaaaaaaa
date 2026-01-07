
export interface Product {
  id: string;
  name: string;
  weight?: string;
  price: number;
  image: string;
  category: 'individual' | 'especial' | 'combo';
  description?: string;
}

export interface CartItem extends Product {
  quantity: number;
}
