import { Metadata } from '../products/iproducts';

export interface IBrands {
  results: number;
  metadata: Metadata;
  data: Data[];
}

export interface Data {
  _id: string;
  name: string;
  slug: string;
  image: string;
  createdAt: string;
  updatedAt: string;
}
