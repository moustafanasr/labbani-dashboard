"use client";

import React, { useState } from 'react';
import { useTranslations } from 'next-intl';
import { useQueryClient } from '@tanstack/react-query'; // ✅ استيراد queryClient
import BranchesTable from '@/components/features/branches/branches-table';
import Input from '@/components/ui/input';
import Dropdown from '@/components/ui/dropdown';
import Button from '@/components/ui/button';
import Modal from '@/components/ui/modal';
import BranchForm from '@/components/features/branches/branch-form';
import { useCreateBranch } from '@/hooks/use-branches';
import { Search, Plus } from 'lucide-react';

export default function BranchesPage() {
  const t = useTranslations('Branches');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const createBranch = useCreateBranch();
  const queryClient = useQueryClient(); // ✅ إنشاء client

  const handleAddBranch = async (formData: any) => {
    await createBranch.mutateAsync(formData);
    // ✅ إعادة تحميل بيانات الجدول فوراً بعد الإضافة
    queryClient.invalidateQueries({ queryKey: ['branches'] });
    setIsModalOpen(false);
  };

  return (
    <>
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between mb-6 gap-4">
        <div>
          <h1 className="text-2xl font-bold text-[#1C1C1C] mb-1">{t('title')}</h1>
          <p className="text-sm text-[#666666]">{t('subtitle')}</p>
        </div>
        <Button onClick={() => setIsModalOpen(true)} className="flex items-center gap-2 w-full md:w-auto justify-center">
          <Plus className="w-4 h-4" /> {t('addBranch')}
        </Button>
      </div>

      <div className="bg-white border border-[#F3F3F3] rounded-xl p-4 mb-6 shadow-[0px_0px_8px_rgba(0,0,0,0.08)]">
        <div className="flex flex-wrap items-center gap-4">
          <div className="flex-1 min-w-[200px]">
            <Input placeholder={t('searchPlaceholder')} icon={<Search className="w-4 h-4 text-[#A1A1A1]" />} />
          </div>
          <div className="flex items-center gap-3">
            <Dropdown label="كل المدن" options={['الرياض', 'جدة', 'الدمام']} />
            <Dropdown label="كل الحالات" options={['مفتوح', 'مغلق']} />
          </div>
        </div>
      </div>

      <BranchesTable />

      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} title={t('addBranch')}>
        <BranchForm onSave={handleAddBranch} onCancel={() => setIsModalOpen(false)} />
      </Modal>
    </>
  );
}