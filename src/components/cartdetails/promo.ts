import { PromoCode } from "../../types/index";
import Component from "../component";
import "./promo.css";

class Promo extends Component {
  public cartPromoDescription;
  public cartPromoButton;

  constructor(parentNode: HTMLElement, promoCode: PromoCode, buttonType: string) {
    super(parentNode, "div", ["cart-promo"], "");

    this.cartPromoDescription = new Component(this.elem, "div", ["promo-description"],`${promoCode.name} - ${promoCode.value}%`);
    this.cartPromoButton = new Component(this.elem, "button", ["promo-button"], buttonType);

    this.cartPromoButton.elem.setAttribute("dataset", `${promoCode.code}`);
  }
}

export default Promo;