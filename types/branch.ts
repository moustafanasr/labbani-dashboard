// types/branch.ts
export interface Address {
  id?: number;
  latitude: number;
  longitude: number;
  country?: string;
  region?: string;
  governorate?: string;
  city?: string;
  district?: string;
  street?: string;
  buildingNumber?: string;
  floor?: string;
  apartment?: string;
  landmark?: string;
  notes?: string;
  addressType?: string;
}

export type FulfillmentMethod = 'DRIVE_THRU' | 'DELIVERY' | 'PICKUP' | 'DINE_IN';

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
  fulfillmentMethods?: FulfillmentMethod[];
  code?: string;
  phone?: string;
  email?: string;
  latitude?: number;
  longitude?: number;
}

export type BranchInput = Omit<Branch, 'id' | 'createdAt' | 'productCount' | 'sales' | 'lastUpdated'>;