import Component from "../../components/component";
import "./product.css";

export class ProductPage extends Component {
  private productDetails;

  constructor(parentNode: HTMLElement) {
    super(parentNode, "div", ["product-page"]);

    this.productDetails = new Component(this.elem, "h1", ["product-details"], "PRODUCT DETAILS");

  }
}