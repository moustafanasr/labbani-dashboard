import { useState, useEffect, useCallback } from 'react';
import { Product } from '@/types/product';
import mockProducts from '@/data/mock-products.json';

export const useProducts = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      setProducts(mockProducts as Product[]);
      setIsLoading(false);
    }, 500);
  }, []);

  const mutate = useCallback((newData: Product[] | ((prev: Product[]) => Product[]), shouldRevalidate?: boolean) => {
    setProducts((prev) => {
      if (typeof newData === 'function') {
        return newData(prev);
      }
      return newData;
    });
  }, []);

  return { products, isLoading, mutate };
};