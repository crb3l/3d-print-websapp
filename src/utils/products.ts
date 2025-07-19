// types/product.ts
export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  currency: string;
  images: string[];
  category_id: string;
  stripe_price_id: string;
}

export interface Category {
  id: string;
  name: string;
  slug: string;
  created_at?: string;
}

export interface ProductWithCategory extends Product {
  categories?: Category;
}