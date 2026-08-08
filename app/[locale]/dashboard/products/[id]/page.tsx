"use client";

import React, { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
import AdminLayout from '@/components/layout/admin-layout';
import ProductDetailsLayout from '@/components/features/products/product-details-layout';
import StatusBadge from '@/components/ui/status-badge';
import { useProducts } from '@/hooks/use-products';
import { formatCurrency } from '@/lib/utils';

// ==========================================
// 1. TAB: المعلومات (Info) - التصميم المصحح
// ==========================================
const InfoTab = ({ product }: { product: any }) => {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
      {/* الصورة والسعر */}
      <div className="bg-white border border-[#F3F3F3] rounded-xl p-6 shadow-[0px_0px_8px_rgba(0,0,0,0.08)] flex flex-col items-center justify-between h-full min-h-[300px]">
        <div className="w-full bg-[#F3F3F3] rounded-xl h-48 flex items-center justify-center mb-6">
          <span className="text-sm text-[#A1A1A1]">صورة المنتج</span>
        </div>
        <div className="text-center w-full border-t pt-4">
          <p className="text-2xl font-bold text-[#3E421C] mb-1">{formatCurrency(product.price)}</p>
          <p className="text-xs text-[#666666]">السعر الأساسي</p>
        </div>
      </div>

      {/* التفاصيل الأساسية */}
      <div className="lg:col-span-2 bg-white border border-[#F3F3F3] rounded-xl p-6 shadow-[0px_0px_8px_rgba(0,0,0,0.08)]">
        <h3 className="text-base font-bold text-[#1C1C1C] mb-6 text-right border-b pb-3">التفاصيل الأساسية</h3>
        <div className="space-y-0 text-right">
          <div className="flex justify-between border-b border-[#F8FAFC] py-3"><span className="text-sm text-[#A1A1A1]">الاسم بالعربية</span><span className="text-sm text-[#1C1C1C]">{product.name}</span></div>
          <div className="flex justify-between border-b border-[#F8FAFC] py-3"><span className="text-sm text-[#A1A1A1]">الاسم بالإنجليزية</span><span className="text-sm text-[#1C1C1C]">Pistachio Kunafa</span></div>
          <div className="flex justify-between border-b border-[#F8FAFC] py-3"><span className="text-sm text-[#A1A1A1]">الفئة</span><span className="text-sm text-[#1C1C1C]">{product.category}</span></div>
          <div className="flex justify-between border-b border-[#F8FAFC] py-3"><span className="text-sm text-[#A1A1A1]">الباركود</span><span className="text-sm text-[#1C1C1C]">6281234000001</span></div>
          <div className="flex justify-between border-b border-[#F8FAFC] py-3"><span className="text-sm text-[#A1A1A1]">العلامة التجارية</span><span className="text-sm text-[#1C1C1C]">الأكثر طلبا</span></div>
          <div className="flex justify-between border-b border-[#F8FAFC] py-3"><span className="text-sm text-[#A1A1A1]">عدد الفروع</span><span className="text-sm text-[#1C1C1C]">{product.branches} فروع</span></div>
          <div className="flex justify-between border-b border-[#F8FAFC] py-3"><span className="text-sm text-[#A1A1A1]">آخر تحديث</span><span className="text-sm text-[#1C1C1C]">{product.lastUpdated}</span></div>
          <div className="flex justify-between py-3"><span className="text-sm text-[#A1A1A1]">الحالة</span><StatusBadge status={product.status} label={product.status === 'active' ? 'نشط' : 'غير نشط'} /></div>
        </div>
      </div>

      {/* الوصف */}
      <div className="lg:col-span-3 bg-white border border-[#F3F3F3] rounded-xl p-6 shadow-[0px_0px_8px_rgba(0,0,0,0.08)]">
        <h3 className="text-base font-bold text-[#1C1C1C] mb-4 text-right">الوصف</h3>
        <p className="text-sm text-[#666666] text-right leading-relaxed">
          كنافة ناعمة محشوة بالقشطة ومغطاة بالفستق الحلبي والقطر، تقدم ساخنة.
        </p>
      </div>
    </div>
  );
};

// ==========================================
// 2. TAB: التسعير (Pricing) - لا يحتاج تعديل كبير
// ==========================================
const PricingTab = ({ product }: { product: any }) => {
  const basePrice = product.price;
  const vat = basePrice * 0.15;
  const total = basePrice + vat;

  return (
    <div className="bg-white border border-[#F3F3F3] rounded-xl p-6 shadow-[0px_0px_8px_rgba(0,0,0,0.08)] max-w-3xl mx-auto">
      <h3 className="text-base font-bold text-[#1C1C1C] mb-6 text-right">تفاصيل التسعير</h3>
      <div className="space-y-0 text-right">
        <div className="flex justify-between border-b border-[#F3F4F6] py-3"><span className="text-sm font-medium text-[#666666]">السعر الأساسي</span><span className="text-sm font-medium text-[#1C1C1C]">{basePrice.toFixed(2)} ر.س</span></div>
        <div className="flex justify-between border-b border-[#F3F3F3] py-3"><span className="text-sm font-medium text-[#666666]">ضريبة القيمة المضافة (15%)</span><span className="text-sm font-medium text-[#F4A100]">{vat.toFixed(2)} ر.س</span></div>
        <div className="flex justify-between pt-4"><span className="text-base font-bold text-[#1C1C1C]">الإجمالي شامل الضريبة</span><span className="text-base font-bold text-[#1E8E3E]">{total.toFixed(2)} ر.س</span></div>
      </div>
    </div>
  );
};

// ==========================================
// 3. TAB: المخزون (Inventory)
// ==========================================
const InventoryTab = ({ product }: { product: any }) => {
  const inventoryData = [
    { branch: 'فرع الرياض — طريق الملك عبدالله', available: 82, min: 25, status: 'متوفر' },
    { branch: 'فرع جدة — شارع التحلية', available: 47, min: 25, status: 'متوفر' },
    { branch: 'فرع الدمام — طريق الخليج', available: 19, min: 25, status: 'مخزون منخفض' },
    { branch: 'فرع الخبر — طريق الملك فيصل', available: 31, min: 25, status: 'متوفر' },
    { branch: 'فرع مكة — العزيزية', available: 54, min: 25, status: 'متوفر' },
  ];

  return (
    <div className="bg-white border border-[#F3F3F3] rounded-xl shadow-[0px_0px_8px_rgba(0,0,0,0.08)] overflow-hidden">
      <div className="p-6 border-b border-[#F3F3F3]">
        <h3 className="text-base font-bold text-[#1C1C1C] text-right">المخزون حسب الفرع</h3>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full text-right">
          <thead className="bg-[#F8F8F2] border-b border-[#F3F4F6]">
            <tr>
              <th className="px-6 py-4 text-xs font-medium text-[#3E421C] text-right">الفرع</th>
              <th className="px-6 py-4 text-xs font-medium text-[#3E421C] text-center">المتاح</th>
              <th className="px-6 py-4 text-xs font-medium text-[#3E421C] text-center">الحد الأدنى</th>
              <th className="px-6 py-4 text-xs font-medium text-[#3E421C] text-center">الحالة</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-[#F3F3F3]">
            {inventoryData.map((item, idx) => (
              <tr key={idx} className="hover:bg-[#F8F8F2]">
                <td className="px-6 py-4 text-sm text-[#1C1C1C]">{item.branch}</td>
                <td className="px-6 py-4 text-sm text-[#666666] text-center">{item.available} وجبة</td>
                <td className="px-6 py-4 text-sm text-[#666666] text-center">{item.min} وجبة</td>
                <td className="px-6 py-4 text-center">
                  <StatusBadge status={item.status === 'متوفر' ? 'open' : 'low_stock'} label={item.status} />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

// ==========================================
// 4. TAB: الفروع (Branches) - تصميم الكروت المصحح
// ==========================================
const BranchesTab = ({ product }: { product: any }) => {
  const branches = [
    { name: 'فرع الرياض — طريق الملك عبدالله', city: 'الرياض', status: 'متاح' },
    { name: 'فرع جدة — شارع التحلية', city: 'جدة', status: 'متاح' },
    { name: 'فرع الدمام — طريق الخليج', city: 'الدمام', status: 'متاح' },
    { name: 'فرع الخبر — طريق الملك فيصل', city: 'الخبر', status: 'متاح' },
    { name: 'فرع مكة — العزيزية', city: 'مكة المكرمة', status: 'متاح' },
    { name: 'فرع المدينة — طريق الهجرة', city: 'المدينة المنورة', status: 'غير متاح' },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      {branches.map((branch, idx) => (
        <div 
          key={idx} 
          className="bg-[#F8F8F2] border border-[#DCDFC7] rounded-xl p-4 flex justify-between items-center"
        >
          <div className="text-right">
            <p className="text-sm font-medium text-[#1C1C1C]">{branch.name}</p>
            <p className="text-xs text-[#666666] mt-1">{branch.city} · {branch.status}</p>
          </div>
          <div className={`w-3 h-3 rounded-full ${branch.status === 'متاح' ? 'bg-[#1E8E3E]' : 'bg-[#A1A1A1]'}`} />
        </div>
      ))}
    </div>
  );
};

// ==========================================
// 5. TAB: السجل (History) - تصميم التايم لاين المصحح
// ==========================================
const HistoryTab = ({ product }: { product: any }) => {
  const history = [
    { action: 'تم تعديل السعر من 38 ر.س إلى 42 ر.س', date: '01 أغسطس 2026 · 10:30 ص', user: 'أحمد محمد' },
    { action: 'تم تحديث المخزون في فرع الرياض', date: '28 يوليو 2026 · 02:15 م', user: 'سارة عبدالله' },
    { action: 'تم تعيين الفرع: فرع الخبر', date: '15 يوليو 2026 · 09:00 ص', user: 'أحمد محمد' },
    { action: 'تم إنشاء المنتج', date: '01 مارس 2024 · 11:45 ص', user: 'مدير النظام' },
  ];

  return (
    <div className="bg-white border border-[#F3F3F3] rounded-xl p-6 shadow-[0px_0px_8px_rgba(0,0,0,0.08)]">
      <h3 className="text-base font-bold text-[#1C1C1C] mb-6 text-right">سجل التعديلات</h3>
      <div className="space-y-6">
        {history.map((item, idx) => (
          <div key={idx} className="flex gap-4 text-right relative">
            <div className="flex flex-col items-center pt-1 shrink-0">
              <div className="w-2.5 h-2.5 rounded-full bg-[#3E421C]" />
              {idx !== history.length - 1 && (
                <div className="w-px h-full bg-[#F3F3F3] mt-2" />
              )}
            </div>
            <div className="pb-6">
              <p className="text-sm font-medium text-[#1C1C1C]">{item.action}</p>
              <p className="text-xs text-[#666666] mt-1">{item.date} · بواسطة: {item.user}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

// ==========================================
// الصفحة الرئيسية
// ==========================================
export default function ProductDetailsPage() {
  const params = useParams();
  const { products, isLoading } = useProducts();
  const [activeTab, setActiveTab] = useState<'info' | 'pricing' | 'inventory' | 'branches' | 'history'>('info');
  const [product, setProduct] = useState<any>(null);

  useEffect(() => {
    if (products.length > 0) {
      const found = products.find(p => p.id === params.id);
      setProduct(found);
    }
  }, [products, params.id]);

  if (isLoading || !product) {
    return <AdminLayout><div className="text-center py-20 text-[#A1A1A1]">جاري تحميل المنتج...</div></AdminLayout>;
  }

  return (
    <AdminLayout>
      <ProductDetailsLayout 
        product={product} 
        activeTab={activeTab} 
        onTabChange={setActiveTab}
      >
        {activeTab === 'info' && <InfoTab product={product} />}
        {activeTab === 'pricing' && <PricingTab product={product} />}
        {activeTab === 'inventory' && <InventoryTab product={product} />}
        {activeTab === 'branches' && <BranchesTab product={product} />}
        {activeTab === 'history' && <HistoryTab product={product} />}
      </ProductDetailsLayout>
    </AdminLayout>
  );
}