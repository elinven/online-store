import Component from "../components/component";
import { AppRoute } from "../types/index";
import { StorePage } from "../pages/store/store";
import { ProductPage } from "../pages/product/product";
import { CartPage } from "../pages/cart/cart";
import { Page404 } from "../pages/page404/page404";

export class Router {
  private routes: Array<AppRoute>;
  //private readonly routesArr: Array<AppRoute>;
  private defaultRoute: AppRoute;

  //onInitUserCart: () => void;

  storePage: Component;
  productPage: Component | undefined;
  cartPage: Component | undefined;
  errorPage: Component | undefined;
  currentRoute: string;

  constructor(private rootElement: HTMLElement) {
    this.storePage = new StorePage(this.rootElement);
    //this.onInitUserCart = () => onInitCart();
    this.routes = [
      {
        name: "/",
        component: () => {
          this.rootElement.append(this.storePage.elem);
        },
      },
      /*{
        name: "/404",
        component: () => {
          this.errorPage = new Page404(this.rootElement);
          this.rootElement.append(this.errorPage.elem);
        },
      },*/
      {
        name: "/product-details",
        component: () => {
          this.productPage = new ProductPage(this.rootElement);
          this.rootElement.append(this.productPage.elem);
        },
      },
      {
        name: "/cart",
        component: () => {
          this.cartPage = new CartPage(this.rootElement);
          this.rootElement.append(this.cartPage.elem);
        },
      },
    ];

    //this.routesArr = [...this.routes];
    this.currentRoute = "/";

    this.defaultRoute = {
      name: "",
      component: () => {
        this.errorPage = new Page404(this.rootElement);
        this.rootElement.append(this.errorPage.elem);
      },
    };

    /*this.defaultRoute = {
      name: "/",
      component: () => {
        this.rootElement.append(this.storePage.elem);
      },
    }*/
  }

  updateRouter(): void {
    this.rootElement.innerHTML = "";
    const currRouteFromHash = window.location.hash.slice(1);
     
    const currRouteArray = currRouteFromHash.split("?");
    const currRouteName = currRouteArray[0];
    let currRouteParam = "";
    if (currRouteArray.length > 1) {
      currRouteParam = String(currRouteArray[1]);
    } 
    
    const currRoute = this.routes.find((page) => page.name === currRouteName);

    if (!currRoute) {
      this.currentRoute = currRouteName;
      this.defaultRoute.component(currRouteParam);
    } else {
      !currRouteParam ? window.location.hash = currRoute.name : window.location.hash = currRoute.name + "?" + currRouteParam;
      currRoute.component(currRouteParam);
      this.currentRoute = currRoute.name;
    }
    
    /*!currRouteParam ? window.location.hash = (currRoute || this.defaultRoute).name : window.location.hash = (currRoute || this.defaultRoute).name + "?" + currRouteParam;
    (currRoute || this.defaultRoute).component(currRouteParam);
    this.currentRoute = (currRoute || this.defaultRoute).name;*/
  }

  initRouter(): void {
    if (window.location.hash === "") {
      window.location.hash = "#/";
    }

    window.onpopstate = () => this.updateRouter();
    this.updateRouter();
  }

}