import Component from "../../components/component";
import "./cart.css";

export class CartPage extends Component {
  private cartContent;

  constructor(parentNode: HTMLElement) {
    super(parentNode, "div", ["cart-page"]);

    this.cartContent = new Component(this.elem, "h1", ["cart-components"], "CART IS EMPTY");

  }
}