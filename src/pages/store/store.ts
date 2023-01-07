import Component from "../../components/component";
import { Filters } from "../../components/filters/filters"
import "./store.css";

export class StorePage extends Component {
  private filterWrapper;

  constructor(parentNode: HTMLElement) {
    super(parentNode, "div", ["store-page"]);

    this.filterWrapper = new Filters(this.elem);

  }
}