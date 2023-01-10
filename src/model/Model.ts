import { IBaseState, Product, TSubscriber } from "../types/index";

export class Model {
  private state: IBaseState;
  private subscribers: TSubscriber[];

  constructor() {
    this.state = {
      searchQuery: '',
      sortOrder: '',
      products: [],
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