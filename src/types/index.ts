import { Model } from "../model/Model";

export interface Product {
  readonly id: number;
  readonly title: string;
  readonly description: string;
  readonly price: number;
  readonly discountPercentage: number;
  readonly rating: number;
  readonly stock: number;
  readonly brand: string;
  readonly category: string;
  readonly country: string;
  readonly thumbnail: string;
  readonly images: string[];
}

export interface AppRoute {
  name: string;
  component: (params: string, model: Model, options?: { id: number }) => void;
}

export interface PromoCode {
  readonly code: string;
  readonly name: string;
  readonly value: number;
}

export interface ProductCart {
  amount: number;
  summa: number;
  goods: {
    product: Product;
    amount: number;
  }[];
  promo: boolean;
  codes: PromoCode[];
  limit: number;
  page: number;
}

export const PROMO_CODES = [
  {
    code: 'RS',
    name: 'Rolling Scopes School',
    value: 10
  },
  {
    code: "EPM",
    name: 'EPAM Systems',
    value: 10
  }
]

export enum StatusCodes {
  Unauthorized = 401,
  NotFound = 404
}

export enum Methods {
  GET = 'GET',
  POST = 'POST'
}

export interface IBaseState {
  searchQuery: string;
  sortOrder: string;
  minPrice: number;
  maxPrice: number;
  minStock: number;
  maxStock: number;
  currentFilters: string[];
  products: Product[];
  filteredProducts: Product[];
}

export type TSubscriber = (state: IBaseState) => void; 

export interface IFakeDataResponse {
  limit: number;
  products: Product[];
  skip: number;
  total: number;
}