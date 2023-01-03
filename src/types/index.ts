export interface Product {
  readonly id: string;
  readonly title: string;
  readonly description: string;
  readonly price: number;
  readonly discountPercentage: number;
  readonly rating: number;
  readonly stock: number
  readonly brand: string;
  readonly category: string;
  readonly country: string;
  readonly thumbnail: string;
  readonly images: string[];
}

export enum StatusCodes {
  Unauthorized = 401,
  NotFound = 404
}

export enum Methods {
  GET = 'GET',
  POST = 'POST'
}