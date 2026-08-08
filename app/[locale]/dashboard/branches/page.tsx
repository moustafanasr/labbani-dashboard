"use client"; // لأننا سنستخدم مودال هنا

import React, { useState } from 'react';
import AdminLayout from '@/components/layout/admin-layout';
import BranchesTable from '@/components/features/branches/branches-table';
import Input from '@/components/ui/input';
import Dropdown from '@/components/ui/dropdown';
import Button from '@/components/ui/button';
import Modal from '@/components/ui/modal';
import BranchForm from '@/components/features/branches/branch-form';
import { Search, Plus } from 'lucide-react';
import { useBranches } from '@/hooks/use-branches';

export default function BranchesPage() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { mutate } = useBranches();

  const handleAddBranch = (formData: any) => {
    const newBranch = {
      id: Date.now().toString(),
      name: formData.name,
      city: formData.city,
      manager: formData.manager,
      status: formData.status,
      productCount: 0,
      sales: 0,
      lastUpdated: new Date().toLocaleDateString('ar-EG')
    };
    // تحديث البيانات (هنا هنضيف للجدول فوراً)
    mutate((prev: any) => [...prev, newBranch], false);
    setIsModalOpen(false);
  };

  return (
    <AdminLayout>
      {/* العنوان وزر الإضافة */}
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between mb-6 gap-4">
        <div>
          <h1 className="text-2xl font-bold text-[#1C1C1C] mb-1">الفروع</h1>
          <p className="text-sm text-[#666666]">إدارة فروع المطعم ومعلومات التشغيل والمخزون</p>
        </div>
        <Button 
          onClick={() => setIsModalOpen(true)}
          className="flex items-center gap-2 w-full md:w-auto justify-center"
        >
          <Plus className="w-4 h-4" />
          إضافة فرع
        </Button>
      </div>

      {/* شريط البحث والفلاتر */}
      <div className="bg-white border border-[#F3F3F3] rounded-xl p-4 mb-6 shadow-[0px_0px_8px_rgba(0,0,0,0.08)]">
        <div className="flex flex-wrap items-center gap-4">
          <div className="flex-1 min-w-[200px]">
            <Input 
              placeholder="ابحث باسم الفرع أو المدينة..." 
              icon={<Search className="w-4 h-4 text-[#A1A1A1]" />}
            />
          </div>
          <div className="flex items-center gap-3">
            <Dropdown label="كل المدن" options={['الرياض', 'جدة', 'الدمام']} />
            <Dropdown label="كل الحالات" options={['مفتوح', 'مغلق']} />
          </div>
          <span className="text-sm text-[#666666] mr-auto hidden md:block">6 فروع</span>
        </div>
      </div>

      {/* الجدول */}
      <BranchesTable />

      {/* مودال إضافة فرع من الصفحة الرئيسية */}
      <Modal 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)}
        title="إضافة فرع جديد"
      >
        <BranchForm 
          onSave={handleAddBranch}
          onCancel={() => setIsModalOpen(false)}
        />
      </Modal>
    </AdminLayout>
  );
}