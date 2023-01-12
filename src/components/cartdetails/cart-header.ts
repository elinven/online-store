import { ProductCart } from "../../types/index";
import Component from "../component";
import InputComponent from "../inputcomponent";
//import { getStorageItem } from "../utils/loader";
import "./cart-header.css";

export class CartHeader extends Component {
  private cartTitle;
  private cartControl;
  private cartLimit;
  private cartLimitText;
  public cartLimitNumber;
  private cartPaginator;
  private cartPaginatorText;
  private cartButtonLeft;
  private cartButtonRight;
  public cartPageNumber;
  
  constructor(parentNode: HTMLElement, goodCart: ProductCart) {
    super(parentNode, "div", ["cart-header"]);

    this.cartTitle = new Component(this.elem, "h2", ["cart-title"], "Products in Cart");
    this.cartControl = new Component(this.elem, "div", ["cart-control"]);
    this.cartLimit = new Component(this.cartControl.elem, "div", ["cart-limit"], "");
    this.cartLimitText = new Component(this.cartLimit.elem, "div", ["limit-text"], "LIMIT:");
    this.cartLimitNumber = new InputComponent(this.cartLimit.elem, "number", ["limit-input"], "");
    this.cartPaginator = new Component(this.cartControl.elem, "div", ["cart-paginator"], "");
    this.cartPaginatorText = new Component(this.cartPaginator.elem, "div", ["paginator-text"], "PAGE:");
    this.cartButtonLeft = new Component(this.cartPaginator.elem, "button", ["button-left"], "<");
    this.cartPageNumber = new Component(this.cartPaginator.elem, "div", ["page-number"], `${goodCart.page}`);
    this.cartButtonRight = new Component(this.cartPaginator.elem, "button", ["button-right"], ">");

    this.cartLimitNumber.elem.setAttribute("value", `${goodCart.limit}`);
    this.cartLimitNumber.elem.setAttribute("min", "1");
    this.cartLimitNumber.elem.setAttribute("max", "4");

    window.location.hash = `#/cart?page=${goodCart.page}`;

    this.cartButtonLeft.elem.addEventListener("click", () => {
      if (goodCart.page > 1) {
        goodCart.page --;
        this.cartPageNumber.elem.textContent = `${goodCart.page}`;
        window.location.hash = `#/cart?page=${goodCart.page}`;
        localStorage.setItem('cart', JSON.stringify(goodCart));
      } 
    });

    this.cartButtonRight.elem.addEventListener("click", () => {
      if (goodCart.page < Math.ceil(goodCart.goods.length/goodCart.limit)) {
        goodCart.page ++;
        this.cartPageNumber.elem.textContent = `${goodCart.page}`;
        window.location.hash = `#/cart?page=${goodCart.page}`;
        localStorage.setItem('cart', JSON.stringify(goodCart));
      } 
    });

    this.cartLimitNumber.elem.addEventListener("onchange", () => {
      if (goodCart.page === Math.ceil(goodCart.goods.length/goodCart.limit) && goodCart.goods.length <= Number(this.cartLimitNumber.elem.value)) {
        goodCart.limit = Number(this.cartLimitNumber.elem.value);
        goodCart.page --;
      }
      localStorage.setItem('cart', JSON.stringify(goodCart));
      window.location.hash = `#/cart?page=${goodCart.page}`;
    });
  }

}