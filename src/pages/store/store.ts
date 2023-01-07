import Component from "../../components/component";
import { Filters } from "../../components/filters/filters"
import "./store.css";

export class StorePage extends Component {
  private storeContent;
  private filterWrapper;

  constructor(parentNode: HTMLElement) {
    super(parentNode, "div", ["store-page"]);

    this.storeContent = new Component(this.elem, "h1", ["store-content"], "PRODUCTS");
    this.filterWrapper = new Filters(this.elem);

  }
}