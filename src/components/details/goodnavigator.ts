import { Product } from "../../types/index";
import Component from "../component";
import "./goodnavigator.css";

class GoodNavigator extends Component {
  private goodLinkStore;
  private goodLinkCategory;
  private goodLinkBrand;
  private goodLinkTitle;
  private goodLinkText;

  constructor(parentNode: HTMLElement, goodData: Product) {
    super(parentNode, "div", ["good-nav"], "");
    
    this.goodLinkStore = new Component(this.elem, "a", ["good-link"], "STORE");
    this.goodLinkText = new Component(this.elem, "span", ["good-text"], ">>");
    this.goodLinkCategory = new Component(this.elem, "a", ["good-link"], goodData.category);
    this.goodLinkText = new Component(this.elem, "span", ["good-text"], ">>");
    this.goodLinkBrand = new Component(this.elem, "a", ["good-link"], goodData.brand);
    this.goodLinkText = new Component(this.elem, "span", ["good-text"], ">>");
    this.goodLinkTitle = new Component(this.elem, "a", ["good-text"], goodData.title);

    this.goodLinkStore.elem.addEventListener("click", () => {
      window.location.hash = "#/";
    });

    this.goodLinkCategory.elem.addEventListener("click", () => {
      window.location.hash = `#/?category=${goodData.category}`;
    });

    this.goodLinkBrand.elem.addEventListener("click", () => {
      window.location.hash = `#/?brand=${goodData.brand}`;
    });

  }

}

export default GoodNavigator;