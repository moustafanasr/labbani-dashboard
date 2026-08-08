export interface Branch {
  id: string;
  name: string;
  city: string;
  manager: string;
  productCount: number;
  sales: number;
  status: 'open' | 'closed';
  lastUpdated: string;
}

export interface BranchInventory {
  branchName: string;
  available: number;
  minThreshold: number;
  status: 'available' | 'low_stock';
}