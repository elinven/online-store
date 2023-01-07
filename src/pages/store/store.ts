import Component from "../../components/component";
import { Filters } from "../../components/filters/filters"
import { Items } from "../../components/item/items"
import "./store.css";

export class StorePage extends Component {
  private filterWrapper;
  private itemsWrapper;

  constructor(parentNode: HTMLElement) {
    super(parentNode, "div", ["store-page"]);

    this.filterWrapper = new Filters(this.elem);
    this.itemsWrapper = new Items(this.elem);

  }
}