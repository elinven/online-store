import { Product } from "../../types/index";
import Component from "../component";
import Detail from "./detail";
import "./details.css";

class GoodDetails extends Component {
  private goodDescription: Detail;
  private goodDiscount: Detail;
  private goodRating: Detail;
  private goodStock: Detail;
  private goodBrand: Detail;
  private goodCategory: Detail;

  constructor(parentNode: HTMLElement, goodData: Product) {
    super(parentNode, "div", ["good-details"], "");
    
    this.goodDescription = new Detail(this.elem, "Description", goodData.description);
    this.goodDiscount = new Detail(this.elem, "Discount Percentage", String(goodData.discountPercentage));
    this.goodRating = new Detail(this.elem, "Rating", String(goodData.rating));
    this.goodStock = new Detail(this.elem, "Stock", String(goodData.stock));
    this.goodBrand = new Detail(this.elem, "Brand", goodData.brand);
    this.goodCategory = new Detail(this.elem, "Category", goodData.category);
  }
}

export default GoodDetails;