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
  status: BranchStatus; // تم التعديل هنا ليكون 'open' أو 'closed'
  createdAt: string;
}

// هذا النوع هو المفقود وكان يسبب الخطأ
export type BranchInput = Omit<Branch, 'id' | 'createdAt'>;