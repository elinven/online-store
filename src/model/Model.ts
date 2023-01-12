import { IBaseState, TSubscriber } from "../types/index";

export class Model {
  private state: IBaseState;
  private subscribers: TSubscriber[];

  constructor() {
    this.state = {
      searchQuery: '',
      sortOrder: '',
      minPrice: 0,
      maxPrice: 0,
      minStock: 0,
      maxStock: 0,
      currentFilters: [],
      products: [],
      filteredProducts: []
    };

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