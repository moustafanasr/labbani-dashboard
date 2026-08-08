// types/branch.ts
export type BranchStatus = 'open' | 'closed';

export interface Branch {
  id: string;
  name: string;
  code: string;
  phone: string;
  email: string;
  address: string;
  city: string;
  latitude: number;
  longitude: number;
  status: BranchStatus;
  createdAt: string;

  // حقول واجهة المستخدم (جعلناها optional عشان الـ API يقدر يشتغل من غيرها)
  manager?: string;
  productCount?: number;
  sales?: number;
  lastUpdated?: string;
}

// هذا النوع مخصص للإدخال (API)
export type BranchInput = Omit<Branch, 'id' | 'createdAt' | 'productCount' | 'sales' | 'lastUpdated'>;