//import { Card } from "../../components/card/card";
import Component from "../../components/component";
//import { Person } from "../../components/person/person";
import { PurchaseModal } from "../../components/purchase/purchase";
import "./cart.css";

export class CartPage extends Component {
  private cartContent;
  public cartPurchase: PurchaseModal;

  constructor(parentNode: HTMLElement) {
    super(parentNode, "div", ["cart-page"]);

    this.cartContent = new Component(this.elem, "h1", ["cart-components"], "CART IS EMPTY");
    this.cartPurchase = new PurchaseModal(this.elem);

    this.cartContent.elem.onclick = () => this.openPurchaseModalWindow();

    document.body.onclick = (e:MouseEvent) => this.closePurchaseModalWindow(e);

  }

  openPurchaseModalWindow = () => {
    this.cartPurchase.elem.classList.add('open');
    document.body.classList.add('scroll-lock');
  }

  closePurchaseModalWindow = (e:MouseEvent) => {
    const eWidth = <number>(e.view)?.outerWidth;
    const mWidth = this.cartPurchase.elem.offsetWidth;
    const yStart = 120;
    const yEnd = 120 + this.cartPurchase.elem.offsetHeight;
    if (this.cartPurchase.elem.classList.contains('open') && e.target !== this.cartPurchase.elem && e.target !== this.cartPurchase.confirmButton.elem && e.target !== this.cartContent.elem && (e.x < (eWidth-mWidth)/2 || e.x > ((eWidth-mWidth)/2 + mWidth) || e.y < yStart || e.y > yEnd)) {
      this.cartPurchase.elem.classList.remove('open');
      document.body.classList.remove('scroll-lock');
    }
  }

}