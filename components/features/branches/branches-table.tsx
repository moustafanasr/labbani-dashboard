"use client";

import React, { useState } from 'react';
import { useBranches } from '@/hooks/use-branches';
import { formatCurrency } from '@/lib/utils';
import StatusBadge from '@/components/ui/status-badge';
import DataTable from '@/components/ui/data-table';
import Modal from '@/components/ui/modal';
import BranchForm from './branch-form';
import Button from '@/components/ui/button';
import { Eye, Pencil, Trash2, Store } from 'lucide-react';
import { Branch } from '@/types/branch';

const BranchesTable = () => {
  const { branches, isLoading, mutate } = useBranches();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingBranch, setEditingBranch] = useState<Branch | null>(null);
  const [viewingBranch, setViewingBranch] = useState<Branch | null>(null);

  const handleDelete = (id: string) => {
    if (confirm('هل أنت متأكد من حذف هذا الفرع؟')) {
      const updatedBranches = branches.filter(b => b.id !== id);
      mutate(updatedBranches, false);
    }
  };

  const handleSaveBranch = (formData: any) => {
    if (editingBranch) {
      const updatedBranches = branches.map(b => 
        b.id === editingBranch.id ? { ...b, ...formData } : b
      );
      mutate(updatedBranches, false);
    } else {
      const newBranch: Branch = {
        id: Date.now().toString(),
        name: formData.name,
        city: formData.city,
        manager: formData.manager,
        status: formData.status,
        productCount: 0,
        sales: 0,
        lastUpdated: new Date().toLocaleDateString('ar-EG')
      };
      mutate([...branches, newBranch], false);
    }
    setIsModalOpen(false);
    setEditingBranch(null);
  };

  if (isLoading) {
    return <div className="text-center py-10 text-[#A1A1A1]">جاري تحميل البيانات...</div>;
  }

  return (
    <>
      <DataTable headers={['اسم الفرع', 'المدينة', 'المدير', 'عدد المنتجات', 'المبيعات', 'الحالة', 'آخر تحديث', '']}>
        {branches.map((branch) => (
          <tr key={branch.id} className="hover:bg-[#F8F8F2] transition-colors">
            <td className="px-4 sm:px-6 py-4 whitespace-nowrap">
              <div className="flex items-center gap-3 justify-end">
                <span className="text-sm font-medium text-[#1C1C1C]">{branch.name}</span>
                <Store className="w-5 h-5 text-[#3E421C] hidden sm:block" />
              </div>
            </td>
            <td className="px-4 sm:px-6 py-4 whitespace-nowrap text-sm text-[#666666]">{branch.city}</td>
            <td className="px-4 sm:px-6 py-4 whitespace-nowrap text-sm text-[#666666]">{branch.manager}</td>
            <td className="px-4 sm:px-6 py-4 whitespace-nowrap text-sm text-[#1C1C1C]">{branch.productCount}</td>
            <td className="px-4 sm:px-6 py-4 whitespace-nowrap text-sm text-[#1C1C1C]">{formatCurrency(branch.sales)}</td>
            <td className="px-4 sm:px-6 py-4 whitespace-nowrap">
              <StatusBadge status={branch.status} label={branch.status === 'open' ? 'مفتوح' : 'مغلق'} />
            </td>
            <td className="px-4 sm:px-6 py-4 whitespace-nowrap text-sm text-[#666666]">{branch.lastUpdated}</td>
            <td className="px-4 sm:px-6 py-4 whitespace-nowrap">
              <div className="flex items-center gap-2">
                <button 
                  onClick={() => handleDelete(branch.id)}
                  className="p-1.5 text-[#A1A1A1] hover:text-[#DD404B] transition-colors"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
                <button 
                  onClick={() => {
                    setEditingBranch(branch);
                    setIsModalOpen(true);
                  }}
                  className="p-1.5 text-[#A1A1A1] hover:text-[#3E421C] transition-colors"
                >
                  <Pencil className="w-4 h-4" />
                </button>
                <button 
                  onClick={() => setViewingBranch(branch)}
                  className="p-1.5 text-[#A1A1A1] hover:text-[#3E421C] transition-colors"
                >
                  <Eye className="w-4 h-4" />
                </button>
              </div>
            </td>
          </tr>
        ))}
      </DataTable>

      <Modal 
        isOpen={isModalOpen} 
        onClose={() => {
          setIsModalOpen(false);
          setEditingBranch(null);
        }}
        title={editingBranch ? 'تعديل الفرع' : 'إضافة فرع جديد'}
      >
        <BranchForm 
          initialData={editingBranch}
          onSave={handleSaveBranch}
          onCancel={() => {
            setIsModalOpen(false);
            setEditingBranch(null);
          }}
        />
      </Modal>

      <Modal 
        isOpen={!!viewingBranch} 
        onClose={() => setViewingBranch(null)}
        title="تفاصيل الفرع"
      >
        {viewingBranch && (
          <div className="space-y-3 text-right">
            <div className="flex justify-between border-b pb-2">
              <span className="font-medium text-[#1C1C1C]">الاسم:</span>
              <span className="text-[#666666]">{viewingBranch.name}</span>
            </div>
            <div className="flex justify-between border-b pb-2">
              <span className="font-medium text-[#1C1C1C]">المدينة:</span>
              <span className="text-[#666666]">{viewingBranch.city}</span>
            </div>
            <div className="flex justify-between border-b pb-2">
              <span className="font-medium text-[#1C1C1C]">المدير:</span>
              <span className="text-[#666666]">{viewingBranch.manager}</span>
            </div>
            <div className="flex justify-between border-b pb-2">
              <span className="font-medium text-[#1C1C1C]">الحالة:</span>
              <StatusBadge status={viewingBranch.status} label={viewingBranch.status === 'open' ? 'مفتوح' : 'مغلق'} />
            </div>
            <Button className="w-full mt-4" onClick={() => setViewingBranch(null)}>إغلاق</Button>
          </div>
        )}
      </Modal>
    </>
  );
};

export default BranchesTable;