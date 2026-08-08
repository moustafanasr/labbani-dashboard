import React from 'react';

const Pagination = () => {
  return (
    <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mt-6 border-t border-[#F3F4F6] pt-4 px-2">
      <div className="text-sm text-[#A1A1A1] order-2 sm:order-1">صفحة 1 من 3 · 23 منتج</div>
      <div className="flex items-center gap-2 order-1 sm:order-2 w-full sm:w-auto justify-center">
        <button className="px-3 sm:px-4 py-2 border border-[#F3F3F3] rounded-lg text-sm text-[#A1A1A1] opacity-50 cursor-not-allowed">
          السابق
        </button>
        <button className="w-8 h-8 bg-[#3E421C] text-white rounded-lg text-sm">1</button>
        <button className="w-8 h-8 border border-[#E2E2E2] rounded-lg text-sm text-[#666666]">2</button>
        <button className="w-8 h-8 border border-[#E2E2E2] rounded-lg text-sm text-[#666666]">3</button>
        <button className="px-3 sm:px-4 py-2 border border-[#E2E2E2] rounded-lg text-sm text-[#666666]">
          التالي
        </button>
      </div>
    </div>
  );
};

export default Pagination;