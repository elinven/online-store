import Component from "../component";
import { Item } from "./item";
import "./style.css";
import cardsInfo from "../goods"
import { Product } from "../../types/index";

export class Items extends Component {

  private itemExample: Item | undefined;

  constructor(parentNode: HTMLElement) {
    super(parentNode, "div", ["goods-showcase"]);

    cardsInfo().then((res) => {
      res.products.forEach((el: Product) => {
        this.itemExample = new Item(this.elem, el.title, el.brand, el.category, el.images[0], el.price.toString(), el.discountPercentage.toString(), el.rating.toString(), el.stock.toString())
/*         this.itemUpper = new Component(this.elem, 'div', ['up']);
        this.itemPhoto = new Component(this.elem, 'div', ['photo']);
        this.itemPriceInfo = new Component(this.elem, 'div', []);
        this.itemButtons = new Component(this.elem, 'div', []);
  
        this.itemName = new Component(this.itemUpper.elem, 'div', ['name'], el.name); */
      })
    })

  }
}