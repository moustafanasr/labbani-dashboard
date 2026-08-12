// types/branch.ts
export interface Address {
  id?: number;
  latitude: number;
  longitude: number;
  city?: string;
  street?: string;
  buildingNumber?: string;
  district?: string;
  landmark?: string;
  notes?: string;
  addressType?: string;
}

export interface Branch {
  id: string;
  name: string;
  nameAr?: string;
  city: string;
  manager?: string;
  productCount?: number;
  sales?: number;
  isActive: boolean;
  openingTime?: string;
  closingTime?: string;
  phoneNumber?: string;
  lastUpdated?: string;
  createdAt?: string;
  address?: Address;
  fulfillmentMethods?: string[];
  code?: string;
  phone?: string;
  email?: string;
  latitude?: number;
  longitude?: number;
}

export type BranchInput = Omit<Branch, 'id' | 'createdAt' | 'productCount' | 'sales' | 'lastUpdated'>;