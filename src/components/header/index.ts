import Component from "../component";
import Logo from "../logo/index";
import "./style.css";

export class Header extends Component {
  private appLogo: Logo;
  public cartCost;
  private cartText;
  public cartSumma;
  private cartTotal;
  public cartContent;
  
  constructor(parentNode: HTMLElement) {
    super(parentNode, "div", ["header"]);
    
    this.appLogo = new Logo(this.elem);
    this.cartCost = new Component(this.elem, "div", ["cart-cost"]);
    this.cartText = new Component(this.cartCost.elem, "p", ["cart-text"], "Cart total:");
    this.cartSumma = new Component(this.cartCost.elem, "span", ["cart-summa"], "$0.00");
    this.cartTotal = new Component(this.elem, "div", ["cart-total"]);
    this.cartContent = new Component(this.cartTotal.elem, "div", ["cart-content"], "0");

    //this.cartTotal.elem.style.backgroundImage = `url("../../assets/svg/shopping-bag.svg")`;

    //this.cartTotal.elem.addEventListener("click", () => this.onClickCart());

    this.appLogo.elem.addEventListener("click", () => {
      window.location.hash = "#/";
      location.reload();
    });

    this.cartTotal.elem.addEventListener("click", () => {
      window.location.hash = "#/cart";
      location.reload();
    });

    this.cartContent.elem.addEventListener("click", () => {
      window.location.hash = "#/cart";
      location.reload();
    });
  }

  //onClickCart: () => void = () => {
    //
  //}
}