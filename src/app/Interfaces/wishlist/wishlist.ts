import { Data } from "../products/iproducts"

export interface IWishList {
  status: string
  count: number
  data: Data[]
}