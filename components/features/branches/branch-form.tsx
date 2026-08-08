"use client";

import React, { useState, useEffect } from 'react';
import Button from '@/components/ui/button';
import Input from '@/components/ui/input';
import { Branch } from '@/types/branch';

interface BranchFormProps {
  initialData?: Branch | null;
  onSave: (data: any) => void;
  onCancel: () => void;
}

const BranchForm = ({ initialData, onSave, onCancel }: BranchFormProps) => {
  const [formData, setFormData] = useState({
    name: '',
    city: '',
    manager: '',
    status: 'open'
  });

  useEffect(() => {
    if (initialData) {
      setFormData({
        name: initialData.name,
        city: initialData.city,
        manager: initialData.manager,
        status: initialData.status
      });
    }
  }, [initialData]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave(formData);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4 text-right">
      <div>
        <label className="block text-sm font-medium text-[#1C1C1C] mb-1">اسم الفرع</label>
        <Input 
          value={formData.name}
          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
          placeholder="مثال: فرع الرياض" 
          required
        />
      </div>
      
      <div>
        <label className="block text-sm font-medium text-[#1C1C1C] mb-1">المدينة</label>
        <Input 
          value={formData.city}
          onChange={(e) => setFormData({ ...formData, city: e.target.value })}
          placeholder="مثال: الرياض" 
          required
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-[#1C1C1C] mb-1">اسم المدير</label>
        <Input value={formData.manager || ''} onChange={(e) => setFormData({ ...formData, manager: e.target.value })} required />
      </div>

      <div>
        <label className="block text-sm font-medium text-[#1C1C1C] mb-1">الحالة</label>
        <select 
          value={formData.status}
          onChange={(e) => setFormData({ ...formData, status: e.target.value as 'open' | 'closed' })}
          className="w-full bg-white border border-[#F3F3F3] rounded-lg py-2 px-4 text-sm text-[#1C1C1C] focus:outline-none focus:border-[#3E421C]"
        >
          <option value="open">مفتوح</option>
          <option value="closed">مغلق</option>
        </select>
      </div>

      <div className="flex justify-end gap-3 pt-2">
        <Button type="button" variant="outline" onClick={onCancel}>إلغاء</Button>
        <Button type="submit">حفظ</Button>
      </div>
    </form>
  );
};

export default BranchForm;