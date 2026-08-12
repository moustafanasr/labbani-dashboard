"use client";

import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import React, { useState } from 'react';

export const Providers = ({ children }: { children: React.ReactNode }) => {
  // إنشاء الـ QueryClient مرة واحدة فقط
  const [queryClient] = useState(() => new QueryClient());

  return (
    <QueryClientProvider client={queryClient}>
      {children}
    </QueryClientProvider>
  );
};