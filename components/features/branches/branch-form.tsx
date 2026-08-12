"use client";

import React, { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { branchSchema, BranchFormValues } from '@/lib/branch-schema';
import Button from '@/components/ui/button';
import Input from '@/components/ui/input';
import { Branch, FulfillmentMethod } from '@/types/branch';

interface BranchFormProps {
  initialData?: Branch | null;
  onSave: (data: any) => void;
  onCancel: () => void;
}

const BranchForm = ({ initialData, onSave, onCancel }: BranchFormProps) => {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    setValue,
    watch,
  } = useForm<BranchFormValues>({
    resolver: zodResolver(branchSchema),
    defaultValues: {
      name: initialData?.name || '',
      nameAr: initialData?.nameAr || '',
      city: initialData?.city || '',
      isActive: initialData?.isActive ?? true,
      openingTime: initialData?.openingTime || '09:00',
      closingTime: initialData?.closingTime || '23:00',
      address: {
        latitude: initialData?.address?.latitude || 0,
        longitude: initialData?.address?.longitude || 0,
        country: initialData?.address?.country || 'Saudi Arabia',
        city: initialData?.address?.city || initialData?.city || 'Riyadh',
        street: initialData?.address?.street || '',
        buildingNumber: initialData?.address?.buildingNumber || '',
      },
      fulfillmentMethods: (initialData?.fulfillmentMethods as FulfillmentMethod[]) || ['PICKUP'],
    },
  });

  const isActive = watch('isActive');

  const onSubmit = (data: BranchFormValues) => {
    const payload = {
      name: data.name,
      nameAr: data.nameAr,
      city: data.city,
      isActive: data.isActive,
      openingTime: data.openingTime,
      closingTime: data.closingTime,
      address: {
        latitude: data.address.latitude,
        longitude: data.address.longitude,
        country: data.address.country || 'Saudi Arabia',
        city: data.address.city || data.city,
        street: data.address.street || '',
        buildingNumber: data.address.buildingNumber || '',
      },
      fulfillmentMethods: data.fulfillmentMethods,
    };
    onSave(payload);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 text-right">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-[#1C1C1C] mb-1">اسم الفرع (عربي)</label>
          <Input {...register('name')} placeholder="مثال: فرع الرياض" className={errors.name ? 'border-red-500' : ''} />
          {errors.name && <p className="text-red-500 text-xs mt-1">{errors.name.message}</p>}
        </div>
        <div>
          <label className="block text-sm font-medium text-[#1C1C1C] mb-1">اسم الفرع (إنجليزي)</label>
          <Input {...register('nameAr')} placeholder="Example: Riyadh Branch" />
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-[#1C1C1C] mb-1">المدينة</label>
        <Input {...register('city')} placeholder="مثال: الرياض" className={errors.city ? 'border-red-500' : ''} />
        {errors.city && <p className="text-red-500 text-xs mt-1">{errors.city.message}</p>}
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-[#1C1C1C] mb-1">وقت الفتح</label>
          <Input type="time" {...register('openingTime')} className={errors.openingTime ? 'border-red-500' : ''} />
          {errors.openingTime && <p className="text-red-500 text-xs mt-1">{errors.openingTime.message}</p>}
        </div>
        <div>
          <label className="block text-sm font-medium text-[#1C1C1C] mb-1">وقت الإغلاق</label>
          <Input type="time" {...register('closingTime')} className={errors.closingTime ? 'border-red-500' : ''} />
          {errors.closingTime && <p className="text-red-500 text-xs mt-1">{errors.closingTime.message}</p>}
        </div>
      </div>

      <div className="flex items-center gap-4">
        <label className="block text-sm font-medium text-[#1C1C1C]">الحالة</label>
        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={() => setValue('isActive', true)}
            className={`px-4 py-1 rounded-full text-sm transition-colors ${
              isActive ? 'bg-[#DCFCE7] text-[#1E8E3E]' : 'bg-[#F3F3F3] text-[#666666]'
            }`}
          >
            مفتوح
          </button>
          <button
            type="button"
            onClick={() => setValue('isActive', false)}
            className={`px-4 py-1 rounded-full text-sm transition-colors ${
              !isActive ? 'bg-[#FEE2E2] text-[#DD404B]' : 'bg-[#F3F3F3] text-[#666666]'
            }`}
          >
            مغلق
          </button>
        </div>
      </div>

      <div className="pt-4 border-t border-[#F3F3F3]">
        <h3 className="text-sm font-bold text-[#1C1C1C] mb-4">العنوان والإحداثيات</h3>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-[#1C1C1C] mb-1">خط العرض (Latitude)</label>
            <Input type="number" step="any" {...register('address.latitude', { valueAsNumber: true })} />
          </div>
          <div>
            <label className="block text-sm font-medium text-[#1C1C1C] mb-1">خط الطول (Longitude)</label>
            <Input type="number" step="any" {...register('address.longitude', { valueAsNumber: true })} />
          </div>
        </div>
      </div>

      <div className="flex justify-end gap-3 pt-4">
        <Button type="button" variant="outline" onClick={onCancel}>إلغاء</Button>
        <Button type="submit" disabled={isSubmitting}>
          {isSubmitting ? 'جاري الحفظ...' : 'حفظ'}
        </Button>
      </div>
    </form>
  );
};

export default BranchForm;