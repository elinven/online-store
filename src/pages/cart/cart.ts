import { CartHeader } from "../../components/cartdetails/cart-header";
import CartProduct from "../../components/cartdetails/cart-product";
import Component from "../../components/component";
import InputComponent from "../../components/inputcomponent";
import { PurchaseModal } from "../../components/purchase/purchase";
import { getStorageItem } from "../../components/utils/loader";
import { ProductCart, PROMO_CODES } from "../../types/index";
import "./cart.css";

export class CartPage extends Component {
  private cartContent;
  public cartPurchase: PurchaseModal;
  private cartContainer;
  private cartProductsContainer;
  private cartHeader: CartHeader | undefined;
  private cartProduct: CartProduct | undefined;
  private cartProducts;
  private cartSummaryContainer;
  private cartSummaryProducts;
  private cartSummaryTotal;
  private cartSummaryTotalPromo;
  private cartSummaryPromoInput;
  private cartSummaryPromoContainer;
  private cartSummaryPromoData;
  private cartSummaryButton;


  constructor(parentNode: HTMLElement) {
    super(parentNode, "div", ["cart-page"]);


    let productCart: ProductCart;
    getStorageItem('cart') === "" ? productCart = {amount: 0, summa: 0, goods: [], promo: false, codes: [], limit: 3, page: 1} : productCart = JSON.parse(<string>getStorageItem('cart'));

    const promoData = PROMO_CODES.reduce((acc, c) => acc + `, ${c.code}`, "");

    if (productCart.amount === 0) {
      this.cartContent = new Component(this.elem, "h2", ["cart-components"], "CART IS EMPTY");
    } else {
      let promoTotal: number;
      productCart.promo === true ? promoTotal = productCart.codes.reduce((acc, c) => acc -= productCart.summa / 100 * c.value, productCart.summa) : promoTotal = productCart.summa;
      this.cartContent = new Component(this.elem, "h2", ["cart-components"], "");
      this.cartContainer = new Component(this.elem, "div", ["cart-container"], "")
      this.cartProductsContainer = new Component(this.cartContainer.elem, "div", ["products-container"], "");
      this.cartHeader = new CartHeader(this.cartProductsContainer.elem, productCart);
      this.cartProducts = new Component(this.cartProductsContainer.elem, "div", ["cart-products"], "");
      this.cartSummaryContainer = new Component(this.cartContainer.elem, "div", ["summary-container"], "");
      this.cartSummaryProducts = new Component(this.cartSummaryContainer.elem, "div", ["summary-products"], `Products: ${productCart.amount}`);
      this.cartSummaryTotal = new Component(this.cartSummaryContainer.elem, "div", ["summary-total"], `Total: ${productCart.summa.toFixed(2)}`);
      this.cartSummaryTotalPromo = new Component(this.cartSummaryContainer.elem, "div", ["promo-total"], `Total: ${promoTotal.toFixed(2)}`);
      this.cartSummaryPromoInput = new InputComponent(this.cartSummaryContainer.elem, "text", ["promo-input"], "Enter promo code");
      this.cartSummaryPromoContainer = new Component(this.cartSummaryContainer.elem, "div", ["promo-container"], "");
      this.cartSummaryPromoData = new Component(this.cartSummaryContainer.elem, "div", ["promo-data"], `Promo: ${promoData.substring(2)}`);
      this.cartSummaryButton = new Component(this.cartSummaryContainer.elem, "button", ["summary-button"], "BUY NOW");

      productCart.goods.forEach((pr, i) => {
        // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
        this.cartProduct = new CartProduct(this.cartProducts!.elem, productCart, pr.product, pr.amount, i);
        this.cartProduct.productImage.elem.setAttribute("dataset", `${pr.product.id}`);
        this.cartProduct.productIncrButton.elem.setAttribute("dataset", `${pr.product.id}`);
        this.cartProduct.productDecrButton.elem.setAttribute("dataset", `${pr.product.id}`);
      });

      if (productCart.promo === false) {
        this.cartSummaryTotalPromo.elem.setAttribute("visibility", "hidden");
      }
    }

    this.cartPurchase = new PurchaseModal(this.elem);

    this.cartSummaryButton!.elem.onclick = () => this.openPurchaseModalWindow();

    document.body.onclick = (e:MouseEvent) => this.closePurchaseModalWindow(e);

    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    this.cartProducts!.elem.addEventListener("click", (e:MouseEvent) => {
      const target = <HTMLElement>(e.target);
      if (target.classList.contains('product-image')) {
        localStorage.setItem('cart', JSON.stringify(productCart));
        window.location.hash = `#/product-details/${target.getAttribute("dataset")}`;
      }

    });

    if (getStorageItem('buy') === 'true') {
      this.cartPurchase.elem.classList.add('open');
      document.body.classList.add('scroll-lock');
      localStorage.setItem('buy', 'false');
    }

  }

  openPurchaseModalWindow = () => {
    this.cartPurchase.elem.classList.add('open');
    document.body.classList.add('scroll-lock');
  }

  closePurchaseModalWindow = (e:MouseEvent) => {
    const eWidth = <number>(e.view)?.outerWidth;
    const mWidth = this.cartPurchase.elem.offsetWidth;
    const yStart = 120;
    const yEnd = 120 + this.cartPurchase.elem.offsetHeight;
    if (this.cartPurchase.elem.classList.contains('open') && e.target !== this.cartPurchase.elem && e.target !== this.cartSummaryButton!.elem && (e.x < (eWidth-mWidth)/2 || e.x > ((eWidth-mWidth)/2 + mWidth) || e.y < yStart || e.y > yEnd)) {
      this.cartPurchase.elem.classList.remove('open');
      document.body.classList.remove('scroll-lock');
    }
  }

}