import Component from "../../components/component";
import "./store.css";

export class StorePage extends Component {
  private storeContent;

  constructor(parentNode: HTMLElement) {
    super(parentNode, "div", ["store-page"]);

    this.storeContent = new Component(this.elem, "h1", ["store-content"], "PRODUCTS");

  }
}