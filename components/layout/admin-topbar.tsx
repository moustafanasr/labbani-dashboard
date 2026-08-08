"use client";

import React from 'react';
import { Bell, Search, ChevronDown, Plus, Menu } from 'lucide-react';

interface AdminTopbarProps {
  onMenuToggle?: () => void;
  showMenuButton?: boolean;
}

const AdminTopbar = ({ onMenuToggle, showMenuButton }: AdminTopbarProps) => {
  return (
    <header className="h-[64px] bg-white border-b border-[#F3F3F3] flex items-center justify-between px-4 md:px-8 sticky top-0 z-40">
      
      {/* القسم الأيسر: زر القائمة (للموبايل) */}
      <div className="flex items-center gap-3">
        {showMenuButton && (
          <button onClick={onMenuToggle} className="p-2 hover:bg-[#F3F3F3] rounded-lg text-[#1C1C1C]">
            <Menu className="w-6 h-6" />
          </button>
        )}

        {/* البروفايل والإشعارات */}
        <div className="flex items-center gap-3">
          <div className="text-right hidden md:block">
            <p className="text-xs font-medium text-[#1C1C1C]">عبدالعزيز الشمري</p>
            <p className="text-[10px] text-[#8B95A3]">مدير عام</p>
          </div>
          <div className="w-9 h-9 rounded-full bg-[#F3F3F3] flex items-center justify-center text-[#3E421C] font-bold">
            ع
          </div>
        </div>

        <button className="relative w-9 h-9 flex items-center justify-center border border-[#F3F3F3] rounded-full bg-white hover:bg-gray-50 hidden sm:flex">
          <Bell className="w-4 h-4 text-[#A1A1A1]" />
          <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-[#FB2C36] rounded-full border border-white"></span>
        </button>
      </div>

      {/* القسم الأوسط: البحث */}
      <div className="flex-1 max-w-lg mx-auto hidden md:block px-4">
        <div className="relative">
          <Search className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#A1A1A1]" />
          <input 
            type="text" 
            placeholder="بحث سريع في النظام…" 
            className="w-full bg-white border border-[#F3F3F3] rounded-lg py-1.5 pr-10 pl-4 text-sm text-[#1C1C1C] placeholder:text-[#A1A1A1] focus:outline-none focus:border-[#3E421C]"
          />
        </div>
      </div>

      {/* القسم الأيمن: اختيار الفرع وزر الإضافة */}
      <div className="flex items-center gap-3 md:gap-4">
        <button className="bg-[#3E421C] text-white text-xs font-medium px-3 md:px-4 py-2 rounded-lg flex items-center gap-2 hover:bg-[#4E5323] transition-colors">
          <Plus className="w-4 h-4" />
          <span className="hidden sm:inline">إنشاء</span>
        </button>

        <div className="hidden sm:flex items-center gap-2 border border-[#8A9444] rounded-lg px-3 py-1.5 text-xs text-[#3E421C] cursor-pointer hover:bg-[#F8F8F2]">
          <span>فرع العليا الرئيسي</span>
          <div className="w-5 h-5 bg-[#F8F8F2] rounded-full flex items-center justify-center">
            <ChevronDown className="w-3 h-3 text-[#8A9444]" />
          </div>
        </div>
      </div>
      
    </header>
  );
};

export default AdminTopbar;