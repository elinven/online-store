import Component from "../component";
import { Item } from "./item";
import "./style.css";
import { Product } from "../../types/index";

export class Items extends Component {

  private itemExample: Item | undefined;

  constructor(parentNode: HTMLElement, products: Product[]) {
    super(parentNode, "div", ["goods-showcase"]);

    products.forEach((el: Product) => {
      this.itemExample = new Item(this.elem, el.title, el.brand, el.category, el.images[0], el.price.toString(), el.discountPercentage.toString(), el.rating.toString(), el.stock.toString(), +el.id)
    });
  }
}