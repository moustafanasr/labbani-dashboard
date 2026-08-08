import { useState, useEffect, useCallback } from 'react';
import { Branch } from '@/types/branch';
import mockBranches from '@/data/mock-branches.json';

export const useBranches = () => {
  const [branches, setBranches] = useState<Branch[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      setBranches(mockBranches as Branch[]);
      setIsLoading(false);
    }, 500);
  }, []);

  // دالة الـ mutate (عشان نقدر نغير البيانات يدوياً من الجدول)
  const mutate = useCallback((newData: Branch[] | ((prev: Branch[]) => Branch[]), shouldRevalidate?: boolean) => {
    setBranches((prev) => {
      if (typeof newData === 'function') {
        return newData(prev);
      }
      return newData;
    });
  }, []);

  return { branches, isLoading, mutate };
};