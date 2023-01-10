import Component from "../components/component";
import { Router } from "../router/index";
import { Header } from "../components/header/header";
import { Footer } from "../components/footer/footer";
import { Model } from "../model/Model";
import cardsInfo from "../components/goods";

export class App {
  private header;
  private main;
  private router;
  private footer;

  constructor(private rootElement: HTMLElement) {
    this.header = new Header(this.rootElement);
    this.main = new Component(this.rootElement, "main", ["main"]);
    this.router = new Router(this.main.elem); 
    this.footer = new Footer(this.rootElement);
  }

  start(): void {
    const model = new Model();

    cardsInfo().then((res) => {

      const state = model.getState();

      model.setState({
        ...state,
        products: res.products,
      });

      this.router.initRouter(model);
    });
  }
}