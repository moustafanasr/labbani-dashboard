"use client";

import React from 'react';
import { 
  Package, Tags, ShoppingBag, Users, Store, Building2, Ticket, LogOut, X
} from 'lucide-react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

// (بقية الـ imports والمتغيرات زي ما هي)
const menuItems = [
  { title: 'الكتالوج', items: [{ label: 'المنتجات', icon: Package, href: '/dashboard/products' }, { label: 'الفئات', icon: Tags, href: '/dashboard/categories' }] },
  { title: 'المخزون والمواقع', items: [{ label: 'المخزون', icon: Store, href: '/dashboard/inventory' }, { label: 'الفروع', icon: Building2, href: '/dashboard/branches' }] },
  { title: 'المبيعات والعملاء', items: [{ label: 'الطلبات', icon: ShoppingBag, href: '/dashboard/orders' }, { label: 'العملاء', icon: Users, href: '/dashboard/customers' }, { label: 'الكوبونات', icon: Ticket, href: '/dashboard/coupons' }] },
];

// إضافة props عشان نقدر نقفل الـ drawer من برا
const AdminSidebar = ({ closeMenu }: { closeMenu?: () => void }) => {
  const pathname = usePathname();

  return (
    <aside className="h-full w-full bg-white flex flex-col">
      {/* رأس السايدبار */}
      <div className="h-[78px] border-b border-[#F3F3F3] flex items-center justify-between px-5">
        <div className="flex items-center gap-3 text-[#3E421C]">
          <span className="text-2xl font-bold">مطعم لبني</span>
        </div>
        {/* زر الإغلاق للموبايل */}
        {closeMenu && (
          <button onClick={closeMenu} className="md:hidden p-2 hover:bg-[#F3F3F3] rounded-full">
            <X className="w-5 h-5 text-[#1C1C1C]" />
          </button>
        )}
      </div>

      {/* المنيو */}
      <div className="flex-1 overflow-y-auto py-6 px-3 space-y-6">
        {menuItems.map((category, idx) => (
          <div key={idx} className="space-y-2">
            <h3 className="text-xs font-medium text-[#A1A1A1] px-3 mb-2 text-right">
              {category.title}
            </h3>
            <div className="space-y-1">
              {category.items.map((item, i) => {
                const isActive = pathname === item.href;
                return (
                  <Link 
                    key={i} 
                    href={item.href}
                    onClick={closeMenu} // يقفل المنيو لما نضغط على لينك في الموبايل
                    className={`flex items-center justify-end gap-3 px-3 py-2.5 rounded-lg text-sm transition-colors ${
                      isActive ? 'bg-[rgba(98,105,43,0.1)] text-[#3E421C]' : 'text-[#666666] hover:bg-[#F8F8F2]'
                    }`}
                  >
                    <span>{item.label}</span>
                    <item.icon className="w-5 h-5" />
                  </Link>
                );
              })}
            </div>
          </div>
        ))}
      </div>

      {/* قسم الملف الشخصي */}
      <div className="border-t border-[rgba(21,84,42,0.07)] p-4">
        <div className="flex items-center justify-end gap-3">
          <div className="text-right">
            <p className="text-sm font-medium text-[#1C1C1C]">فيصل آل سعود</p>
            <p className="text-[10px] text-[#A1A1A1]">المشرف الرئيسي</p>
          </div>
          <div className="w-10 h-10 rounded-full bg-[#F3F3F3] flex items-center justify-center text-[#3E421C] font-bold">ف</div>
        </div>
        <button className="w-full mt-4 flex items-center justify-center gap-2 text-[#DD404B] text-sm border border-red-100 rounded-lg py-2 hover:bg-red-50 transition-colors">
          <LogOut className="w-4 h-4" />
          <span>تسجيل خروج</span>
        </button>
      </div>
    </aside>
  );
};

export default AdminSidebar;