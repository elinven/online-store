import Component from "../components/component";
//import { Router } from "../router/index";
import { Header } from "../components/header/index";
import { Footer } from "../components/footer/index";

export class App {
  private header;
  private main;
  //private router;
  private footer;

  constructor(private rootElement: HTMLElement) {
    this.header = new Header(this.rootElement);
    this.main = new Component(this.rootElement, "main", ["main"]);

    //this.router = new Router(); 
    this.footer = new Footer(this.rootElement);
  }

}