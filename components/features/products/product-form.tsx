"use client";

import React, { useState, useEffect } from 'react';
import Button from '@/components/ui/button';
import Input from '@/components/ui/input';
import { Product } from '@/types/product';

interface ProductFormProps {
  initialData?: Product | null;
  onSave: (data: any) => void;
  onCancel: () => void;
}

const ProductForm = ({ initialData, onSave, onCancel }: ProductFormProps) => {
  const [formData, setFormData] = useState({
    name: '',
    sku: '',
    category: '',
    price: 0,
    branches: 1,
    status: 'active'
  });

  useEffect(() => {
    if (initialData) {
      setFormData({
        name: initialData.name,
        sku: initialData.sku,
        category: initialData.category,
        price: initialData.price,
        branches: initialData.branches,
        status: initialData.status
      });
    }
  }, [initialData]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave(formData);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4 text-right">
      <div>
        <label className="block text-sm font-medium text-[#1C1C1C] mb-1">اسم المنتج</label>
        <Input value={formData.name} onChange={(e) => setFormData({ ...formData, name: e.target.value })} required />
      </div>
      <div>
        <label className="block text-sm font-medium text-[#1C1C1C] mb-1">SKU</label>
        <Input value={formData.sku} onChange={(e) => setFormData({ ...formData, sku: e.target.value })} required />
      </div>
      <div>
        <label className="block text-sm font-medium text-[#1C1C1C] mb-1">الفئة</label>
        <Input value={formData.category} onChange={(e) => setFormData({ ...formData, category: e.target.value })} required />
      </div>
      <div>
        <label className="block text-sm font-medium text-[#1C1C1C] mb-1">السعر (ر.س)</label>
        <Input type="number" value={formData.price} onChange={(e) => setFormData({ ...formData, price: Number(e.target.value) })} required />
      </div>
      <div>
        <label className="block text-sm font-medium text-[#1C1C1C] mb-1">الحالة</label>
        <select 
          value={formData.status}
          onChange={(e) => setFormData({ ...formData, status: e.target.value as 'active' | 'inactive' })}
          className="w-full bg-white border border-[#F3F3F3] rounded-lg py-2 px-4 text-sm text-[#1C1C1C] focus:outline-none focus:border-[#3E421C]"
        >
          <option value="active">نشط</option>
          <option value="inactive">غير نشط</option>
        </select>
      </div>
      <div className="flex justify-end gap-3 pt-2">
        <Button type="button" variant="outline" onClick={onCancel}>إلغاء</Button>
        <Button type="submit">حفظ</Button>
      </div>
    </form>
  );
};

export default ProductForm;