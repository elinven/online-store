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

    //this.cartPromoButton.elem.addEventListener("click", () => {
      //if (this.cartNewPromo!.cartPromoButton.elem.textContent === "ADD") {
      //const currentCode = <PromoCode>PROMO_CODES.find(c => c.code === this.cartPromoButton.elem.getAttribute("dataset"));
      //console.log(currentCode.code);
      /*this.cartPromo = new Promo(this.cartPromos.elem, currentCode, "DROP");
      this.cartPromo.elem.setAttribute("dataset", `${currentCode.code}`);
      if (!goodCart.promo) goodCart.promo = true;
      goodCart.codes.push(currentCode);*/
      // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
      //document.querySelector('.summary-total')!.setAttribute("text-decoration", "line-through");
      // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
/*document.querySelector('.promo-total')!.textContent = `Total: $${goodCart.codes.reduce((acc, c) => acc - goodCart.summa * c.value, goodCart.summa).toFixed(2)}`;
      localStorage.setItem('cart', JSON.stringify(goodCart));
      this.cartNewPromo?.delete();*/
      //}
    //});
  }
}

export default Promo;