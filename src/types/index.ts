export type Category = 'all' | 'hoodies' | 'polos' | 'runway-suits';

export interface ProductColor {
  name: string;
  hex: string;
}

export interface Product {
  id: string;
  name: string;
  slug: string;
  category: 'hoodies' | 'polos' | 'runway-suits';
  description: string;
  features: string[];
  price_usdc: number;
  price_sol_approx: number;
  images: string[];
  sizes: string[];
  colors: ProductColor[];
  stock: number;
  badge?: string;
  is_featured?: boolean;
}

export interface CartItem {
  id: string;
  productId: string;
  name: string;
  slug: string;
  price_usdc: number;
  size: string;
  color: ProductColor;
  quantity: number;
  image: string;
}

export interface OrderItem {
  productId: string;
  name: string;
  price_usdc: number;
  size: string;
  color: string;
  quantity: number;
}

export interface Order {
  id: string;
  reference_pubkey: string;
  status: 'pending' | 'paid' | 'failed' | 'cancelled';
  items: OrderItem[];
  total_usdc: number;
  total_sol_estimated: number;
  customer_email?: string;
  customer_wallet?: string;
  shipping_address?: {
    name: string;
    street: string;
    city: string;
    country: string;
    postalCode: string;
  };
  tx_signature?: string;
  created_at?: string;
  updated_at?: string;
}
