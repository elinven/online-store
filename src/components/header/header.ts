import { ProductCart } from "../../types/index";
import Component from "../component";
import Logo from "../logo/logo";
import { getStorageItem } from "../utils/loader";
import "./header.css";

export class Header extends Component {
  private appLogo: Logo;
  public cartCost;
  private cartText;
  public cartSumma;
  private cartTotal;
  public cartAmount;
  
  constructor(parentNode: HTMLElement) {
    super(parentNode, "div", ["header"]);

    let productCart: ProductCart;
    getStorageItem('cart') === "" ? productCart = {amount: 0, summa: 0, goods: [], promo: false, codes: [], limit: 3, page: 0} : productCart = JSON.parse(<string>getStorageItem('cart'));
    
    this.appLogo = new Logo(this.elem);
    this.cartCost = new Component(this.elem, "div", ["cart-cost"]);
    this.cartText = new Component(this.cartCost.elem, "p", ["cart-text"], "Cart total:");
    this.cartSumma = new Component(this.cartCost.elem, "span", ["cart-summa"], `$${productCart.summa.toFixed(2)}`);
    this.cartTotal = new Component(this.elem, "div", ["cart-total"]);
    this.cartAmount = new Component(this.cartTotal.elem, "div", ["cart-amount"], `${productCart.amount}`);

    this.cartTotal.elem.addEventListener("click", () => {
      getStorageItem('cart') === "" ? productCart = {amount: 0, summa: 0, goods: [], promo: false, codes: [], limit: 3, page: 0} : productCart = JSON.parse(<string>getStorageItem('cart'));
      if (productCart.page === 0) {
        window.location.hash = "#/cart";
      } else {
        window.location.hash = `#/cart?page=${productCart.page}`;
      }
    });

  }

}