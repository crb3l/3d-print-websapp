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

// hooks/useProducts.ts
import { useEffect, useState } from 'react';
import supabase from '../utils/supabase';

export function useProducts() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchProducts() {
      const { data, error } = await supabase
        .from('products')
        .select(`
          *,
          categories(name, slug)
        `)
        .eq('status', 'active');

      if (!error) setProducts(data || []);
      setLoading(false);
    }

    fetchProducts();
  }, []);

  return { products, loading };
}