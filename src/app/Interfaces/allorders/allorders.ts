import { IShippingAddress } from '../checkout/icheck-out';
import { CartProduct } from '../cart/icart';
import { Category, Subcategory, Brand } from '../products/iproducts';

export interface IAllOrders {
  shippingAddress: IShippingAddress;
  taxPrice: number;
  shippingPrice: number;
  totalOrderPrice: number;
  paymentMethodType: string;
  isPaid: boolean;
  isDelivered: boolean;
  _id: string;
  user: User;
  cartItems: CartProduct[];
  createdAt: string;
  updatedAt: string;
  id: number;
  __v: number;
  paidAt?: string;
}

export interface User {
  _id: string;
  name: string;
  email: string;
  phone: string;
}

export interface Product {
  subcategory: Subcategory[];
  ratingsQuantity: number;
  _id: string;
  title: string;
  imageCover: string;
  category: Category;
  brand: Brand;
  ratingsAverage: number;
  id: string;
}
