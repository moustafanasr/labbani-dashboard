// types/branch.ts
export type BranchStatus = 'open' | 'closed';

export interface Branch {
  id: string;
  name: string;
  code: string;           // من الملف الجديد
  phone: string;          // من الملف الجديد
  email: string;          // من الملف الجديد
  address: string;        // من الملف الجديد
  city: string;
  latitude: number;       // من الملف الجديد
  longitude: number;      // من الملف الجديد
  status: BranchStatus;
  createdAt: string;      // من الملف الجديد

  // حقول الجدول القديمة (نحتاجها للواجهة)
  manager: string;
  productCount: number;
  sales: number;
  lastUpdated: string;
}

export type BranchInput = Omit<Branch, 'id' | 'createdAt' | 'lastUpdated' | 'productCount' | 'sales'>;