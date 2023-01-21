import { CartHeader } from "../../components/cartdetails/cart-header";
import CartProduct from "../../components/cartdetails/cart-product";
import PromoCodes from "../../components/cartdetails/promos";
import Component from "../../components/component";
import { PurchaseModal } from "../../components/purchase/purchase";
import goRouter from "../../components/utils/go-router";
import { getStorageItem } from "../../components/utils/loader";
import { ProductCart } from "../../types/index";
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
  private cartSummaryTitle;
  private cartSummaryProducts;
  private cartSummaryTotal;
  private cartSummaryTotalPromo;
  private cartPromoCodes;
  private cartSummaryButton;

  constructor(parentNode: HTMLElement) {
    parentNode.innerHTML = "";
    super(parentNode, "div", ["cart-page"]);

    let productCart: ProductCart;
    getStorageItem('cart') === "" ? productCart = {amount: 0, summa: 0, goods: [], promo: false, codes: [], limit: 3, page: 0} : productCart = JSON.parse(<string>getStorageItem('cart'));

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
      this.cartSummaryTitle = new Component(this.cartSummaryContainer.elem, "h2", ["summary-title"], "Summary");
      this.cartSummaryProducts = new Component(this.cartSummaryContainer.elem, "div", ["summary-products"], `Products: ${productCart.amount}`);
      this.cartSummaryTotal = new Component(this.cartSummaryContainer.elem, "div", ["summary-total"], `Total: $${productCart.summa.toFixed(2)}`);
      this.cartSummaryTotalPromo = new Component(this.cartSummaryContainer.elem, "div", ["promo-total"], "");
      this.cartPromoCodes = new PromoCodes(this.cartSummaryContainer.elem, productCart);
      this.cartSummaryButton = new Component(this.cartSummaryContainer.elem, "button", ["summary-button"], "BUY NOW");

      productCart.goods.filter((pr, i) => i >= productCart.limit * (productCart.page - 1) && i < productCart.limit * productCart.page).forEach((pr, i) => {
        this.cartProduct = new CartProduct(<HTMLElement>this.cartProducts?.elem, productCart, pr.product, pr.amount, i + productCart.limit * (productCart.page - 1));
        this.cartProduct.productImage.elem.setAttribute("dataset", `${pr.product.id}`);
      });

      if (!productCart.promo) {
        this.cartSummaryTotal.elem.setAttribute("style", "text-decoration: none");
      } else {
        this.cartSummaryTotal.elem.setAttribute("style", "text-decoration: line-through 0.25px solid #fff");
        this.cartSummaryTotalPromo.elem.textContent = `Total: $${promoTotal.toFixed(2)}`;
      }
    }

    this.cartPurchase = new PurchaseModal(this.elem);

    if (getStorageItem('buy') === 'true') {
      this.openPurchaseModalWindow();
      localStorage.setItem('buy', 'false');
    }

    (<HTMLElement>this.cartSummaryButton?.elem).onclick = () => this.openPurchaseModalWindow();

    document.body.onclick = (e:MouseEvent) => this.closePurchaseModalWindow(e);

    this.cartProducts?.elem.addEventListener("click", (e:MouseEvent) => {
      const target = <HTMLElement>(e.target);
      if (target.classList.contains('product-image')) {
        goRouter(`#/product-details/${target.getAttribute("dataset")}`, productCart);
      }
    });
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
    if (this.cartPurchase.elem.classList.contains('open') && e.target !== this.cartPurchase.elem && e.target !== this.cartSummaryButton?.elem && (e.x < (eWidth-mWidth)/2 || e.x > ((eWidth-mWidth)/2 + mWidth) || e.y < yStart || e.y > yEnd)) {
      this.cartPurchase.elem.classList.remove('open');
      document.body.classList.remove('scroll-lock');
    }
  }

}