import { Card } from "../../components/card/card";
import Component from "../../components/component";
import "./cart.css";

export class CartPage extends Component {
  private cartContent;
  public cartPurchase;

  constructor(parentNode: HTMLElement) {
    super(parentNode, "div", ["cart-page"]);

    this.cartContent = new Component(this.elem, "h1", ["cart-components"], "CART IS EMPTY");
    this.cartPurchase = new Card(this.elem);

  }
}