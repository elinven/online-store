import Component from "../../components/component";
import GoodNavigator from "../../components/details/goodnavigator";
import GoodSlider from "../../components/details/slider";
import GoodDetails from "../../components/details/details";
import ProductButtons from "../../components/details/product-buttons";
import { Model } from "../../model/Model";
import "./product.css";
import { getStorageItem } from "../../components/utils/loader";
import { ProductCart } from "../../types/index";

export class ProductPage extends Component {
  private productLinks: GoodNavigator | undefined;
  private productContainer;
  private productTitle;
  private detailsContainer;
  private productSlider: GoodSlider | undefined;
  private productDetails: GoodDetails | undefined;
  private productButtons: ProductButtons | undefined;

  constructor(parentNode: HTMLElement, model: Model, id?: number) {
    super(parentNode, "div", ["product-page"]);
    const state = model.getState();
    const product = state.products.find((item: { id: number; }) => item.id === id);
    console.log(product);
    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    let productCart: ProductCart;
    getStorageItem('cart') === "" ? productCart = {amount: 0, summa: 0, goods: []} : productCart = JSON.parse(<string>getStorageItem('cart'));
    console.log(productCart);

    if (product) {
      this.productLinks = new GoodNavigator(this.elem, product);
      this.productContainer = new Component(this.elem,"div", ["product-container"], "");
      this.productTitle = new Component(this.productContainer.elem, "h1", ["product-title"], product.title);
      this.detailsContainer = new Component(this.productContainer.elem,"div", ["details-container"], "");
      this.productSlider = new GoodSlider(this.detailsContainer.elem, product);
      this.productDetails = new GoodDetails(this.detailsContainer.elem, product);
      this.productButtons = new ProductButtons(this.detailsContainer.elem, product, productCart);
    } else {
      this.productTitle = new Component(this.elem, "h1", ["product-title"], "PRODUCT DETAILS with following ID were not found:" + id);
    }
  }
}