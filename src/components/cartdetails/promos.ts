import { ProductCart, PromoCode, PROMO_CODES } from "../../types/index";
import Component from "../component";
import InputComponent from "../inputcomponent";
import Promo from "./promo";
import "./promos.css";

class PromoCodes extends Component {
  private cartCodesContainer;
  public cartPromoContainer;
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

    this.cartCodesContainer = new Component(this.elem, "div", ["codes-container"]);
    if (goodCart.codes.length > 0) {
      this.cartPromoContainer = new Component(this.cartCodesContainer.elem, "div", ["promo-container"]);
      this.cartPromoTitle = new Component(this.cartPromoContainer.elem, "div", ["promo-title"], "Applied codes");
      this.cartPromos = new Component(this.cartPromoContainer.elem, "div", ["cart-promos"]);
      goodCart.codes.forEach((c) => {
        this.cartPromo = new Promo((<HTMLElement>this.cartPromos?.elem), c, "DROP");
      });
    }

    this.cartPromoInput = new InputComponent(this.elem, "text", ["promo-input"], "Enter promo code");
    this.cartAddPromo = new Component(this.elem, "div", ["add-promo"]);
    this.cartPromoData = new Component(this.elem, "div", ["promo-data"], `Promo: ${promoData.substring(2)}`);

    this.cartPromoInput.elem.addEventListener("input", () => {
      let newCode: PromoCode;
      if (PROMO_CODES.some((c) => c.code === this.cartPromoInput.elem.value.toUpperCase())) {
        newCode = <PromoCode>PROMO_CODES.find(c => c.code === this.cartPromoInput.elem.value.toUpperCase());
        this.cartAddPromoDescription = new Component(this.cartAddPromo.elem, "div", ["add-description"],`${newCode.name} - ${newCode.value}%`);
        this.cartAddPromoDescription.elem.setAttribute("dataset", `${newCode.code}`);
        if (!goodCart.codes.some((c) => c.code === newCode.code)) {
          this.cartAddPromoButton = new Component(this.cartAddPromo.elem, "button", ["adding-button"], "ADD");
          this.cartAddPromoButton.elem.setAttribute("dataset", `${newCode.code}`);
        }
      } else {
        this.cartAddPromoDescription?.elem.setAttribute("dataset", '');
        this.cartAddPromoDescription?.delete();
        this.cartAddPromoButton?.elem.setAttribute("dataset", '');
        this.cartAddPromoButton?.delete();
      }
    });

    this.cartAddPromo.elem.addEventListener("click", (e: MouseEvent) => {
      if (e.target === this.cartAddPromoButton?.elem) {
        const currentCode = <PromoCode>PROMO_CODES.find(c => c.code === this.cartAddPromoButton?.elem.getAttribute("dataset"));
        if (goodCart.codes.length === 0) {
          this.cartPromoContainer = new Component(this.cartCodesContainer.elem, "div", ["promo-container"]);
          this.cartPromoTitle = new Component(this.cartPromoContainer.elem, "div", ["promo-title"], "Applied codes");
          this.cartPromos = new Component(this.cartPromoContainer.elem, "div", ["cart-promos"]);
        }
        this.cartPromo = new Promo((<HTMLElement>this.cartPromos?.elem), currentCode, "DROP");
        this.cartPromo.elem.setAttribute("dataset", `${currentCode.code}`);
        this.cartPromo.cartPromoButton.elem.setAttribute("dataset", `${currentCode.code}`);
        if (!goodCart.promo) goodCart.promo = true;
        goodCart.codes.push(currentCode);
        (<Element>document.querySelector('.summary-total')).setAttribute("style", "text-decoration: line-through 0.25px solid #fff");
        (<Element>document.querySelector('.promo-total')).textContent = `Total: $${goodCart.codes.reduce((acc, c) => acc - goodCart.summa / 100 * c.value, goodCart.summa).toFixed(2)}`;
        localStorage.setItem('cart', JSON.stringify(goodCart));
        this.cartAddPromoButton?.delete();
      }
    });

    this.cartCodesContainer.elem.addEventListener("click", (e: MouseEvent) => {
      (document.querySelectorAll('.promo-button')).forEach((el) => {
        if (e.target === el) {
          const codeIndex = goodCart.codes.findIndex(c => c.code === el.getAttribute("dataset"));
          goodCart.codes.splice(codeIndex, 1);
          if (el.getAttribute("dataset") === this.cartAddPromoDescription?.elem.getAttribute("dataset")) {
            this.cartAddPromoButton = new Component(this.cartAddPromo.elem, "button", ["adding-button"], "ADD");
            this.cartAddPromoButton.elem.setAttribute("dataset", <string>el.getAttribute("dataset"));
          }
          if (goodCart.codes.length > 0) {
            (<Element>document.querySelector('.summary-total')).setAttribute("style", "text-decoration: line-through 0.25px solid #fff");
            (<Element>document.querySelector('.promo-total')).textContent = `Total: $${goodCart.codes.reduce((acc, c) => acc - goodCart.summa / 100 * c.value, goodCart.summa).toFixed(2)}`;
            (document.querySelectorAll('.cart-promo')).forEach((pr) => {
              if (pr === el.parentElement) {
                el.parentElement.remove();
              }
            });
          } else {
            goodCart.promo = false;
            (<Element>document.querySelector('.summary-total')).setAttribute("style", "text-decoration: none");
            (<Element>document.querySelector('.promo-total')).textContent = "";
            this.cartPromoContainer?.delete();
          }
          localStorage.setItem('cart', JSON.stringify(goodCart));
        }
      });
    });
  }
}

export default PromoCodes;