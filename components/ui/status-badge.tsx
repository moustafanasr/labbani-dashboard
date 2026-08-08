import React from 'react';

interface StatusBadgeProps {
  status: 'active' | 'low_stock' | 'closed' | 'open' | string;
  label?: string;
}

const StatusBadge = ({ status, label }: StatusBadgeProps) => {
  // تحديد الألوان والـ background بناءً على الحالة
  let bgClass = 'bg-[#F3F3F3] text-[#666666]'; // Default gray
  let textClass = '';

  switch (status) {
    case 'active':
    case 'open':
    case 'available':
      bgClass = 'bg-[#DCFCE7] text-[#1E8E3E]';
      break;
    case 'low_stock':
      bgClass = 'bg-[#FEF3C7] text-[#8C5E2E]';
      break;
    case 'closed':
    case 'inactive':
      bgClass = 'bg-[#FEE2E2] text-[#DD404B]';
      break;
    default:
      break;
  }

  return (
    <span className={`px-3 py-1 rounded-full text-xs font-medium ${bgClass} ${textClass} inline-block`}>
      {label || status}
    </span>
  );
};

export default StatusBadge;