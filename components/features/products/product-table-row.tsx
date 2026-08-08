"use client";

import React from 'react';
import { Product } from '@/types/product';
import StatusBadge from '@/components/ui/status-badge';
import { Eye, Pencil, Trash2 } from 'lucide-react';
import { formatCurrency } from '@/lib/utils';

interface ProductTableRowProps {
  product: Product;
  onDelete: (id: string) => void;
  onEdit: (product: Product) => void;
  onView: (product: Product) => void;
}

const ProductTableRow = ({ product, onDelete, onEdit, onView }: ProductTableRowProps) => {
  return (
    <tr className="hover:bg-[#F8F8F2] transition-colors">
      <td className="px-4 py-4 whitespace-nowrap">
        <div className="flex items-center justify-start gap-3">
          <div className="w-10 h-10 bg-[#F3F3F3] rounded-lg flex items-center justify-center shrink-0">
            <span className="text-[10px] text-[#A1A1A1]">IMG</span>
          </div>
          <span className="text-sm font-medium text-[#1C1C1C]">{product.name}</span>
        </div>
      </td>
      <td className="px-4 py-4 whitespace-nowrap text-sm text-[#666666] text-center">{product.sku}</td>
      <td className="px-4 py-4 whitespace-nowrap text-center">
        <span className="bg-[#F3F3F3] px-3 py-1 rounded-full text-xs text-[#666666]">{product.category}</span>
      </td>
      <td className="px-4 py-4 whitespace-nowrap text-sm text-[#1C1C1C] text-center">{formatCurrency(product.price)}</td>
      <td className="px-4 py-4 whitespace-nowrap text-sm text-[#666666] text-center">{product.branches} فروع</td>
      <td className="px-4 py-4 whitespace-nowrap text-center">
        <StatusBadge status={product.status} label={product.status === 'active' ? 'نشط' : 'غير نشط'} />
      </td>
      <td className="px-4 py-4 whitespace-nowrap text-sm text-[#666666] text-center">{product.lastUpdated}</td>
      <td className="px-4 py-4 whitespace-nowrap text-center">
        <div className="flex items-center justify-center gap-2">
          <button onClick={() => onDelete(product.id)} className="p-1.5 text-[#A1A1A1] hover:text-[#DD404B]"><Trash2 className="w-4 h-4" /></button>
          <button onClick={() => onEdit(product)} className="p-1.5 text-[#A1A1A1] hover:text-[#3E421C]"><Pencil className="w-4 h-4" /></button>
          <button onClick={() => onView(product)} className="p-1.5 text-[#A1A1A1] hover:text-[#3E421C]"><Eye className="w-4 h-4" /></button>
        </div>
      </td>
    </tr>
  );
};

export default ProductTableRow;