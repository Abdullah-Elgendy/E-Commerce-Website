import { Metadata } from '../products/iproducts';

export interface ISubcategories {
  results: number;
  metadata: Metadata;
  data: DataSC[];
}

export interface DataSC {
  _id: string;
  name: string;
  slug: string;
  category: string;
  createdAt: string;
  updatedAt: string;
}
