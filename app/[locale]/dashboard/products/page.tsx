"use client";

import React, { useState } from 'react';
import AdminLayout from '@/components/layout/admin-layout';
import ProductTableRow from '@/components/features/products/product-table-row';
import ProductForm from '@/components/features/products/product-form';
import Input from '@/components/ui/input';
import Dropdown from '@/components/ui/dropdown';
import Button from '@/components/ui/button';
import Modal from '@/components/ui/modal';
import DataTable from '@/components/ui/data-table';
import Pagination from '@/components/ui/pagination';
import { Search, Plus } from 'lucide-react';
import { useProducts } from '@/hooks/use-products';
import { Product } from '@/types/product';

export default function ProductsPage() {
  const { products, isLoading, mutate } = useProducts();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);
  const [viewingProduct, setViewingProduct] = useState<Product | null>(null);

  const handleDelete = (id: string) => {
    if (confirm('هل أنت متأكد من حذف هذا المنتج؟')) {
      mutate(products.filter(p => p.id !== id), false);
    }
  };

  const handleSaveProduct = (formData: any) => {
    if (editingProduct) {
      mutate(products.map(p => p.id === editingProduct.id ? { ...p, ...formData } : p), false);
    } else {
      const newProduct: Product = {
        id: Date.now().toString(),
        name: formData.name,
        sku: formData.sku,
        category: formData.category,
        price: formData.price,
        branches: 1,
        status: formData.status,
        lastUpdated: new Date().toLocaleDateString('ar-EG')
      };
      mutate([...products, newProduct], false);
    }
    setIsModalOpen(false);
    setEditingProduct(null);
  };

  return (
    <AdminLayout>
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between mb-6 gap-4">
        <div>
          <h1 className="text-2xl font-bold text-[#1C1C1C] mb-1">المنتجات</h1>
          <p className="text-sm text-[#666666]">إدارة منتجات القائمة والأسعار والمخزون والفروع</p>
        </div>
        <Button onClick={() => setIsModalOpen(true)} className="flex items-center gap-2 w-full md:w-auto justify-center">
          <Plus className="w-4 h-4" /> إضافة منتج
        </Button>
      </div>

      <div className="bg-white border border-[#F3F3F3] rounded-xl p-4 mb-6 shadow-[0px_0px_8px_rgba(0,0,0,0.08)]">
        <div className="flex flex-wrap items-center gap-4">
          <div className="flex-1 min-w-[200px]">
            <Input placeholder="ابحث باسم المنتج أو SKU..." icon={<Search className="w-4 h-4 text-[#A1A1A1]" />} />
          </div>
          <div className="flex items-center gap-3">
            <Dropdown label="كل الفئات" options={['دجاج', 'لحوم', 'مشاوي']} />
            <Dropdown label="كل الحالات" options={['نشط', 'غير نشط']} />
          </div>
          <span className="text-sm text-[#666666] mr-auto hidden md:block">{products.length} منتج</span>
        </div>
      </div>

      {isLoading ? (
        <div className="text-center py-10 text-[#A1A1A1]">جاري تحميل البيانات...</div>
      ) : (
        <>
          <DataTable headers={['المنتج', 'SKU', 'الفئة', 'السعر', 'الفروع', 'الحالة', 'آخر تحديث', '']}>
            {products.map((product) => (
              <ProductTableRow 
                key={product.id} 
                product={product}
                onDelete={handleDelete}
                onEdit={(p) => { setEditingProduct(p); setIsModalOpen(true); }}
                onView={setViewingProduct}
              />
            ))}
          </DataTable>
          <Pagination />
        </>
      )}

      <Modal isOpen={isModalOpen} onClose={() => { setIsModalOpen(false); setEditingProduct(null); }} title={editingProduct ? 'تعديل المنتج' : 'إضافة منتج جديد'}>
        <ProductForm initialData={editingProduct} onSave={handleSaveProduct} onCancel={() => { setIsModalOpen(false); setEditingProduct(null); }} />
      </Modal>

      <Modal isOpen={!!viewingProduct} onClose={() => setViewingProduct(null)} title="تفاصيل المنتج">
        {viewingProduct && (
          <div className="space-y-3 text-right">
            <div className="flex justify-between border-b pb-2"><span className="font-medium">الاسم:</span><span>{viewingProduct.name}</span></div>
            <div className="flex justify-between border-b pb-2"><span className="font-medium">SKU:</span><span>{viewingProduct.sku}</span></div>
            <div className="flex justify-between border-b pb-2"><span className="font-medium">الفئة:</span><span>{viewingProduct.category}</span></div>
            <div className="flex justify-between border-b pb-2"><span className="font-medium">السعر:</span><span>{viewingProduct.price} ر.س</span></div>
            <Button className="w-full mt-4" onClick={() => setViewingProduct(null)}>إغلاق</Button>
          </div>
        )}
      </Modal>
    </AdminLayout>
  );
}