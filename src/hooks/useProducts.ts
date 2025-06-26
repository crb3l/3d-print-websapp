// hooks/useProducts.ts
import { useEffect, useState } from 'react';
import supabase from '../utils/supabase';
import { ProductWithCategory } from '../utils/products';

export function useProducts() {
  const [products, setProducts] = useState<ProductWithCategory[]>([]);
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