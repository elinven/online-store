import Component from "../components/component";
import { AppRoute } from "../types/index";
import { StorePage } from "../pages/store/store";
import { ProductPage } from "../pages/product/product";
import { CartPage } from "../pages/cart/cart";
import { Page404 } from "../pages/page404/page404";
import { Model } from "../model/Model";

export class Router {
  model: Model;
  private routes: Array<AppRoute>;
  //private readonly routesArr: Array<AppRoute>;
  private defaultRoute: AppRoute;

  //onInitUserCart: () => void;

  storePage?: Component;
  productPage?: Component;
  cartPage: Component | undefined;
  errorPage: Component | undefined;
  currentRoute: string;

  constructor(private rootElement: HTMLElement) {
    this.model = new Model();
    //this.onInitUserCart = () => onInitCart();
    this.routes = [
      {
        name: "/",
        component: (params, model) => {
          this.storePage = new StorePage(this.rootElement, model);
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
        name: "/product-details/:id",
        component: (params, model, options) => {
          this.productPage = new ProductPage(this.rootElement, model, options?.id);
          this.rootElement.append(this.productPage.elem);
        },
      },
      {
        name: "/cart",
        component: (params, model) => {
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
    const [pagePathName, id = null] = currRouteFromHash.split('/').filter((item) => !!item);
    
    const currRouteArray = currRouteFromHash.split("?");
    const currRouteName = currRouteArray[0];
    let currRouteParam = "";
    if (currRouteArray.length > 1) {
      currRouteParam = String(currRouteArray[1]);
    } 
    
    const currRoute = this.routes.find((page) => (page.name === currRouteName) || (page.name === `/${pagePathName}/:id`));
    
    if (!currRoute) {
      this.currentRoute = currRouteName;
      this.defaultRoute.component(currRouteParam, this.model);
    } else {
      !currRouteParam ? window.location.hash = currRouteFromHash : window.location.hash = currRoute.name + "?" + currRouteParam;
      if (id) {
        currRoute.component(currRouteParam, this.model, { id: +id });
      } else {
        currRoute.component(currRouteParam, this.model);
      }
      this.currentRoute = currRoute.name;
    }
    
    /*!currRouteParam ? window.location.hash = (currRoute || this.defaultRoute).name : window.location.hash = (currRoute || this.defaultRoute).name + "?" + currRouteParam;
    (currRoute || this.defaultRoute).component(currRouteParam);
    this.currentRoute = (currRoute || this.defaultRoute).name;*/
  }

  initRouter(model: Model): void {
    this.model = model;

    if (window.location.hash === "") {
      window.location.hash = "#/";
    }

    window.onpopstate = () => this.updateRouter();
    this.updateRouter();
  }

}