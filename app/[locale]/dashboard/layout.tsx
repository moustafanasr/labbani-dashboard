"use client";

import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import AdminLayout from '@/components/layout/admin-layout';

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem('labbani_auth_token');
    if (!token) {
      router.replace('/login');
    }
  }, [router]);

  return <AdminLayout>{children}</AdminLayout>;
}