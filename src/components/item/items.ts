import Component from "../component";
import { Item } from "./item";
import "./style.css";
import { Product, ProductCart } from "../../types/index";
import { getStorageItem } from "../utils/loader";

export class Items extends Component {

  private itemExample: Item | undefined;

  constructor(parentNode: HTMLElement, products: Product[]) {
    super(parentNode, "div", ["goods-showcase"]);

    let productCart: ProductCart;
    getStorageItem('cart') === "" ? productCart = {amount: 0, summa: 0, goods: [], promo: false, codes: [], limit: 3, page: 0} : productCart = JSON.parse(<string>getStorageItem('cart'));
    
    products.forEach((el: Product) => {
      this.itemExample = new Item(this.elem, productCart, el); //el.title, el.brand, el.category, el.images[0], el.price.toString(), el.discountPercentage.toString(), el.rating.toString(), el.stock.toString(), +el.id)
    });
  }
}