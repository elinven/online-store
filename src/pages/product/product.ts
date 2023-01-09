import Component from "../../components/component";
import { Model } from "../../model/Model";
import "./product.css";

export class ProductPage extends Component {
  private productDetails;

  constructor(parentNode: HTMLElement, model: Model, id?: number) {
    super(parentNode, "div", ["product-page"]);
    const state = model.getState();

    const product = state.products.find((item: { id: number; }) => item.id === id);

    if (product) {
      this.productDetails = new Component(this.elem, "h1", ["product-details"], JSON.stringify(product, null, 6));
    } else {
      this.productDetails = new Component(this.elem, "h1", ["product-details"], "PRODUCT DETAILS with following id were not found:" + id);
    }
  }
}