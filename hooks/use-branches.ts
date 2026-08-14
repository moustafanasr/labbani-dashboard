import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import api from '@/lib/api';
import { Branch } from '@/types/branch';
import { toast } from 'sonner'; // ✅ استيراد toast

// 1. جلب كل الفروع (limit=1000 لجلب كل الفروع مرة واحدة)
export const useBranches = (page = 1, limit = 1000, search = '', sortOrder = 'desc', isActive?: boolean) => {
  return useQuery({
    queryKey: ['branches', page, limit, search, sortOrder, isActive],
    queryFn: async () => {
      const params = new URLSearchParams({
        page: page.toString(),
        limit: limit.toString(),
        sortOrder,
      });
      if (search && search.trim() !== '') {
        params.append('search', search);
      }
      if (isActive !== undefined) {
        params.append('isActive', isActive.toString());
      }

      const response = await api.get(`/branches?${params.toString()}`);
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
      const payload = {
        ...newBranch,
        fulfillmentMethod: Array.isArray(newBranch.fulfillmentMethod) && newBranch.fulfillmentMethod.length > 0
          ? newBranch.fulfillmentMethod[0]
          : "PICKUP",
      };
      console.log("📦 إرسال بيانات الإضافة:", payload);
      const { data } = await api.post('/branches', payload);
      return data;
    },
    onSuccess: () => {
      toast.success('✅ تم إضافة الفرع بنجاح!'); // ✅ رسالة النجاح
      queryClient.invalidateQueries({ queryKey: ['branches'] });
    },
    onError: (error: any) => {
      console.error(error);
      toast.error('❌ حدث خطأ أثناء إضافة الفرع.');
    },
  });
};

// 3. تعديل فرع (PATCH) - تم إزالة fulfillmentMethod
export const useUpdateBranch = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async ({ id, ...rest }: { id: string; [key: string]: any }) => {
      // ✅ إزالة fulfillmentMethod من التعديل لأن الـ API لا يقبله
      const { fulfillmentMethod, ...payload } = rest;
      
      console.log("📦 إرسال بيانات التعديل:", payload);
      const { data } = await api.patch(`/branches/${id}`, payload);
      return data;
    },
    onSuccess: () => {
      toast.success('✅ تم تعديل الفرع بنجاح!'); // ✅ رسالة النجاح
      queryClient.invalidateQueries({ queryKey: ['branches'] });
    },
    onError: (error: any) => {
      console.error(error);
      toast.error('❌ حدث خطأ أثناء تعديل الفرع.');
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
      toast.success('✅ تم حذف الفرع بنجاح!'); // ✅ رسالة النجاح
      queryClient.invalidateQueries({ queryKey: ['branches'] });
    },
    onError: (error: any) => {
      console.error(error);
      toast.error('❌ حدث خطأ أثناء حذف الفرع.');
    },
  });
};