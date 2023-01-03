import Component from "../component";
import Logo from "../logo/index";
import "./styles.css";

export class Header extends Component {
  private applogo: Logo;
  private cartText;
  public cartSumma;
  private cartTotal;
  public cartContent;
  
  constructor(parentNode: HTMLElement) {
    super(parentNode, "div", ["header"]);
    
    this.applogo = new Logo(this.elem);
    this.cartText = new Component(this.elem, "p", ["cart-text"], "Cart total");
    this.cartSumma = new Component(this.elem, "span", ["cart-summa"], "$0.00");
    this.cartTotal = new Component(this.elem, "div", ["cart-total"]);
    this.cartContent = new Component(this.cartTotal.elem, "div", ["cart-content"], "0");

    this.cartTotal.elem.style.backgroundImage = "./assets/svg/shopping-cart.svg";

    this.cartTotal.elem.addEventListener("click", () => this.onClickCart());
  }

  onClickCart: () => void = () => {
    //
  }
}