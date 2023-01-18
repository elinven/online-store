import { ProductCart, PromoCode, PROMO_CODES } from "../../types/index";
import Component from "../component";
import InputComponent from "../inputcomponent";
import Promo from "./promo";
import "./promos.css";

class PromoCodes extends Component {
  private cartPromoContainer;
  private cartPromoTitle;
  public cartPromos;
  public cartPromo: Promo | undefined;
  private cartPromoInput;
  private cartPromoData;
  public cartAddPromo;
  public cartAddPromoDescription: Component | undefined;
  public cartAddPromoButton: Component | undefined;

  constructor(parentNode: HTMLElement, goodCart: ProductCart) {
    super(parentNode, "div", ["cart-codes"], "");

    const promoData = PROMO_CODES.reduce((acc, c) => acc + `, ${c.code}`, "");

    this.cartPromoContainer = new Component(this.elem, "div", ["promo-container"]);
    this.cartPromoTitle = new Component(this.cartPromoContainer.elem, "div", ["promo-title"], "Applied codes");
    this.cartPromos = new Component(this.cartPromoContainer.elem, "div", ["cart-promos"]);
    this.cartPromoInput = new InputComponent(this.elem, "text", ["promo-input"], "Enter promo code");
    this.cartAddPromo = new Component(this.elem, "div", ["add-promo"]);
    this.cartPromoData = new Component(this.elem, "div", ["promo-data"], `Promo: ${promoData.substring(2)}`);

    this.cartPromoInput.elem.addEventListener("input", () => {
      let newCode: PromoCode;
      if (PROMO_CODES.some((c) => c.code === this.cartPromoInput.elem.value.toUpperCase())) {
        newCode = <PromoCode>PROMO_CODES.find(c => c.code === this.cartPromoInput.elem.value.toUpperCase());
        this.cartAddPromoDescription = new Component(this.cartAddPromo.elem, "div", ["add-description"],`${newCode.name} - ${newCode.value}%`);
        this.cartAddPromoButton = new Component(this.cartAddPromo.elem, "button", ["adding-button"], "ADD");
        this.cartAddPromoButton.elem.setAttribute("dataset", `${newCode.code}`);
        console.log(this.cartAddPromoButton?.elem.getAttribute("dataset"));
      }
      if (!PROMO_CODES.some((c) => c.code === this.cartPromoInput.elem.value.toUpperCase())) {
        this.cartAddPromoDescription?.delete();
        this.cartAddPromoButton?.delete();
      }
    });

    console.log(goodCart.codes);
    this.cartAddPromoButton?.elem.addEventListener("click", () => {
      const currentCode = <PromoCode>PROMO_CODES.find(c => c.code === this.cartAddPromoButton?.elem.getAttribute("dataset"));
      console.log(currentCode.code);
      this.cartPromo = new Promo(this.cartPromos.elem, currentCode, "DROP");
      this.cartPromo.elem.setAttribute("dataset", `${currentCode.code}`);
      if (!goodCart.promo) goodCart.promo = true;
      goodCart.codes.push(currentCode);
      (<Element>document.querySelector('.summary-total')).setAttribute("text-decoration", "line-through");
      (<Element>document.querySelector('.promo-total')).textContent = `Total: $${goodCart.codes.reduce((acc, c) => acc - goodCart.summa * c.value, goodCart.summa).toFixed(2)}`;
      localStorage.setItem('cart', JSON.stringify(goodCart));
      this.cartAddPromoDescription?.delete();
      this.cartAddPromoButton?.delete();
    });

    console.log(this.cartAddPromoButton?.elem.getAttribute("dataset"));

    if (this.cartPromo) {
      this.cartPromo.cartPromoButton.elem.addEventListener("click", () => {
        //if (this.cartPromo!.cartPromoButton.elem.textContent === "DROP") {
          const codeIndex = goodCart.codes.findIndex(c => c.code === (<HTMLElement>this.cartPromo?.elem).getAttribute("dataset"));
          goodCart.codes.splice(codeIndex, 1);
          if (goodCart.codes.length) {
            (<Element>document.querySelector('.summary-total')).setAttribute("text-decoration", "line-through");
            (<Element>document.querySelector('.promo-total')).textContent = `Total: $${goodCart.codes.reduce((acc, c) => acc - goodCart.summa * c.value, goodCart.summa).toFixed(2)}`;
          } else {
            goodCart.promo = false;
            (<Element>document.querySelector('.summary-total')).setAttribute("text-decoration", "none");
            (<Element>document.querySelector('.promo-total')).textContent = "";
          }
          this.cartPromo?.delete();

        //}
      });
    }
  }

}

export default PromoCodes;