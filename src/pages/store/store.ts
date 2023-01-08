import Component from "../../components/component";
import { Filters } from "../../components/filters/filters"
import { Items } from "../../components/item/items"
import "./store.css";

export class StorePage extends Component {
  private filterWrapper;
  private itemsWrapper;
  private goodsWrapper;

  constructor(parentNode: HTMLElement) {
    super(parentNode, "div", ["store-page"]);

    this.filterWrapper = new Filters(this.elem);
    this.goodsWrapper = new Component(this.elem, 'div', ['goods-wrapper']);
    this.itemsWrapper = new Items(this.goodsWrapper.elem);

  }
}