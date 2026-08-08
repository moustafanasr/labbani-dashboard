export interface Product {
  id: string;
  name: string;
  sku: string;
  category: string;
  price: number;
  branches: number;
  status: 'active' | 'inactive';
  lastUpdated: string;
  image?: string;
}