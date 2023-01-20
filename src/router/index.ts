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
  private defaultRoute: AppRoute;

  storePage?: Component;
  productPage?: Component;
  cartPage: Component | undefined;
  errorPage: Component | undefined;
  currentRoute: string;

  constructor(private rootElement: HTMLElement) {
    this.model = new Model();
    this.routes = [
      {
        name: "/",
        component: (params, model) => {
          this.storePage = new StorePage(this.rootElement, model);
        },
      },

      {
        name: "/product-details/:id",
        component: (params, model, options) => {
          this.productPage = new ProductPage(this.rootElement, model, options?.id);
        },
      },
      {
        name: "/cart",
        //component: (params, model) => {
        component: () => {
          this.cartPage = new CartPage(this.rootElement);
        },
      },
    ];

    this.currentRoute = "/";

    this.defaultRoute = {
      name: "",
      component: () => {
        this.errorPage = new Page404(this.rootElement);
      },
    };

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

    /*let page: number;

    if (currRouteParam.includes('page')) {
      page = Number(currRouteParam.split("=")[1]);
    } else {
      page = 0;
    }*/

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