"use client";

import React from 'react';
import { useRouter } from 'next/navigation';
import { Product } from '@/types/product';
import StatusBadge from '@/components/ui/status-badge';
import Button from '@/components/ui/button';
import { ArrowRight, Pencil, Trash2 } from 'lucide-react';

interface ProductDetailsLayoutProps {
  product: Product;
  children: React.ReactNode;
  activeTab: 'info' | 'pricing' | 'inventory' | 'branches' | 'history';
  onTabChange: (tab: 'info' | 'pricing' | 'inventory' | 'branches' | 'history') => void;
}

const ProductDetailsLayout = ({ 
  product, 
  children, 
  activeTab, 
  onTabChange 
}: ProductDetailsLayoutProps) => {
  const router = useRouter();

  const tabs = [
    { id: 'info', label: 'المعلومات' },
    { id: 'pricing', label: 'التسعير' },
    { id: 'inventory', label: 'المخزون' },
    { id: 'branches', label: 'الفروع' },
    { id: 'history', label: 'السجل' },
  ];

  return (
    <div className="space-y-6">
      {/* 1. الهيدر الرئيسي */}
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div className="flex items-center gap-4">
          {/* زر العودة */}
          <button 
            onClick={() => router.back()} 
            className="flex items-center gap-1 text-sm text-[#374151] border border-[#E5E7EB] px-3 py-1.5 rounded-lg hover:bg-[#F8F8F2]"
          >
            <ArrowRight className="w-4 h-4" />
            العودة
          </button>

          {/* اسم المنتج والحالة */}
          <div>
            <div className="flex items-center gap-3">
              <h1 className="text-2xl font-bold text-[#1C1C1C]">{product.name}</h1>
              <StatusBadge status={product.status} label={product.status === 'active' ? 'نشط' : 'غير نشط'} />
            </div>
            <p className="text-sm text-[#666666] mt-1">SKU: {product.sku} · {product.category}</p>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <Button variant="outline" className="flex items-center gap-2 h-9 px-4">
            <Pencil className="w-4 h-4" /> تعديل
          </Button>
          <Button variant="danger" className="flex items-center gap-2 h-9 px-4">
            <Trash2 className="w-4 h-4" /> حذف
          </Button>
        </div>
      </div>

      {/* 2. شريط التبويبات (Tabs) */}
      <div className="border-b border-[#E5E7EB]">
        <div className="flex gap-6 overflow-x-auto">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => onTabChange(tab.id as any)}
              className={`pb-3 text-sm font-medium transition-colors border-b-2 whitespace-nowrap ${
                activeTab === tab.id 
                  ? 'border-[#62692B] text-[#62692B]' 
                  : 'border-transparent text-[#A1A1A1] hover:text-[#1C1C1C]'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      {/* 3. المحتوى */}
      <div>{children}</div>
    </div>
  );
};

export default ProductDetailsLayout;