import Component from "../../components/component";
import { Filters } from "../../components/filters/filters"
import { Items } from "../../components/item/items"
import { Search } from "../../components/search&sort/search";
import { Sort } from "../../components/search&sort/sort";
import "./store.css";

export class StorePage extends Component {
  private filterWrapper;
  private itemsWrapper;
  private goodsWrapper;
  private searchAndSortWrapper;
  private search;
  private sort;

  constructor(parentNode: HTMLElement) {
    super(parentNode, "div", ["store-page"]);

    this.filterWrapper = new Filters(this.elem);
    this.goodsWrapper = new Component(this.elem, 'div', ['goods-wrapper']);
    this.searchAndSortWrapper = new Component(this.goodsWrapper.elem, 'div', ['sort-and-search-wrapper']);
    this.search = new Search(this.searchAndSortWrapper.elem);
    this.sort = new Sort(this.searchAndSortWrapper.elem);
    this.itemsWrapper = new Items(this.goodsWrapper.elem);

  }
}