import Component from "../components/component";
import { Router } from "../router/index";
import { Header } from "../components/header/index";
import { Footer } from "../components/footer/index";
import { Filter } from "../components/filters/filter";

export class App {
  private header;
  private main;
  private router;
  private footer;
  private filters;

  constructor(private rootElement: HTMLElement) {
    this.header = new Header(this.rootElement);
    this.main = new Component(this.rootElement, "main", ["main"]);
    this.router = new Router(this.main.elem); 
    this.footer = new Footer(this.rootElement);
    this.filters = new Filter(this.main.elem);
  }

  start(): void {
    this.router.initRouter();
  }

}