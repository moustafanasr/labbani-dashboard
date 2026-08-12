import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import api from '@/lib/api';
import { Branch } from '@/types/branch';

export const useBranches = () => {
  return useQuery({
    queryKey: ['branches'],
    queryFn: async () => {
      const response = await api.get('/branches');
      console.log("✅ البيانات الخام من السيرفر:", response.data);
      const rawData = response.data?.data || [];

      return rawData.map((item: any): Branch => ({
        id: item.id.toString(),
        name: item.nameAr || item.name,
        nameAr: item.nameAr,
        city: item.city || '',
        manager: item.manager || 'مدير الفرع',
        productCount: 0,
        sales: 0,
        isActive: item.isActive,
        openingTime: item.openingTime,
        closingTime: item.closingTime,
        phoneNumber: item.phoneNumber,
        lastUpdated: item.updatedAt 
          ? new Date(item.updatedAt).toLocaleDateString('ar-EG') 
          : '-',
        createdAt: item.createdAt,
        address: item.addresses && item.addresses.length > 0 ? {
          id: item.addresses[0].id,
          latitude: parseFloat(item.addresses[0].latitude),
          longitude: parseFloat(item.addresses[0].longitude),
          city: item.addresses[0].city,
          street: item.addresses[0].street,
          buildingNumber: item.addresses[0].buildingNumber,
          district: item.addresses[0].district,
          landmark: item.addresses[0].landmark,
          notes: item.addresses[0].notes,
          addressType: item.addresses[0].addressType,
        } : undefined,
        fulfillmentMethods: item.fulfillmentMethods?.map((f: any) => f.fulfillmentMethod) || [],
        code: '',
        phone: item.phoneNumber || '',
        email: '',
        latitude: 0,
        longitude: 0,
      }));
    },
  });
};

// 2. إضافة فرع جديد (POST)
export const useCreateBranch = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (newBranch: any) => {
      // ✅ إرسال البيانات بالشكل الصحيح الذي يتوقعه السيرفر
      const payload = {
        name: newBranch.name,
        nameAr: newBranch.nameAr || '',
        city: newBranch.city,
        isActive: newBranch.isActive,
        openingTime: newBranch.openingTime || '09:00',
        closingTime: newBranch.closingTime || '23:00',
        phoneNumber: newBranch.phoneNumber || '',
        address: {
          latitude: newBranch.address?.latitude || 0,
          longitude: newBranch.address?.longitude || 0,
          country: newBranch.address?.country || 'Saudi Arabia',
          region: newBranch.address?.region || '',
          governorate: newBranch.address?.governorate || '',
          city: newBranch.address?.city || newBranch.city,
          district: newBranch.address?.district || '',
          street: newBranch.address?.street || '',
          buildingNumber: newBranch.address?.buildingNumber || '',
          floor: newBranch.address?.floor || '',
          apartment: newBranch.address?.apartment || '',
          landmark: newBranch.address?.landmark || '',
          notes: newBranch.address?.notes || '',
        },
        fulfillmentMethods: Array.isArray(newBranch.fulfillmentMethods) 
          ? newBranch.fulfillmentMethods.map((m: string) => ({ fulfillmentMethod: m }))
          : [],
      };
      console.log("📦 إرسال بيانات الإضافة:", payload);
      const { data } = await api.post('/branches', payload);
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['branches'] });
    },
  });
};

// 3. تعديل فرع (PATCH)
export const useUpdateBranch = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async ({ id, ...rest }: { id: string; [key: string]: any }) => {
      // ✅ نفس الهيكل الصحيح للتعديل
      const payload = {
        name: rest.name,
        nameAr: rest.nameAr || '',
        city: rest.city,
        isActive: rest.isActive,
        openingTime: rest.openingTime || '09:00',
        closingTime: rest.closingTime || '23:00',
        phoneNumber: rest.phoneNumber || '',
        address: {
          latitude: rest.address?.latitude || 0,
          longitude: rest.address?.longitude || 0,
          country: rest.address?.country || 'Saudi Arabia',
          region: rest.address?.region || '',
          governorate: rest.address?.governorate || '',
          city: rest.address?.city || rest.city,
          district: rest.address?.district || '',
          street: rest.address?.street || '',
          buildingNumber: rest.address?.buildingNumber || '',
          floor: rest.address?.floor || '',
          apartment: rest.address?.apartment || '',
          landmark: rest.address?.landmark || '',
          notes: rest.address?.notes || '',
        },
        fulfillmentMethods: Array.isArray(rest.fulfillmentMethods) 
          ? rest.fulfillmentMethods.map((m: string) => ({ fulfillmentMethod: m }))
          : [],
      };
      console.log("📦 إرسال بيانات التعديل:", payload);
      const { data } = await api.patch(`/branches/${id}`, payload);
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['branches'] });
    },
  });
};

// 4. حذف فرع (DELETE)
export const useDeleteBranch = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (id: string) => {
      console.log(`🗑️ حذف الفرع رقم: ${id}`);
      await api.delete(`/branches/${id}`);
      return id;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['branches'] });
    },
  });
};