import { IBaseState, TSubscriber } from "../types/index";

export class Model {
  private state: IBaseState;
  private subscribers: TSubscriber[];

  constructor() {
    this.state = {
      searchQuery: '',
      sortOrder: '',
      minPrice: 12,
      maxPrice: 1749,
      minStock: 2,
      maxStock: 150,
      currentFilters: [],
      products: [],
      filteredProducts: []
    };

    console.log('model worked');

    this.subscribers = [];
  }

  getState = () => structuredClone(this.state);

  setState = (state: IBaseState) => {
    this.state = state;
    this.fire();
  }

  subscribe = (callback: TSubscriber) => {
    this.subscribers.push(callback);
  }

  fire = () => {
    this.subscribers.forEach((cb) => cb(this.getState()));
  }
}