import { z } from 'zod';

export const branchSchema = z.object({
  name: z.string().min(1, 'اسم الفرع مطلوب'),
  nameAr: z.string().optional(),
  city: z.string().min(1, 'المدينة مطلوبة'),
  phoneNumber: z.string().optional(),
  isActive: z.boolean(),
  openingTime: z.string().min(1, 'وقت الفتح مطلوب'),
  closingTime: z.string().min(1, 'وقت الإغلاق مطلوب'),
  address: z.object({
    latitude: z.number(),
    longitude: z.number(),
    country: z.string().optional(),
    region: z.string().optional(),
    governorate: z.string().optional(),
    city: z.string().optional(),
    district: z.string().optional(),
    street: z.string().optional(),
    buildingNumber: z.string().optional(),
    floor: z.string().optional(),
    apartment: z.string().optional(),
    landmark: z.string().optional(),
    notes: z.string().optional(),
  }),
  fulfillmentMethods: z.array(z.enum(['DRIVE_THRU', 'DELIVERY', 'PICKUP', 'DINE_IN'])).min(1, 'اختر طريقة واحدة على الأقل'),
});

export type BranchFormValues = z.infer<typeof branchSchema>;