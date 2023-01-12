import { Product, ProductCart } from "../../types/index";
import Component from "../component";
import "./cart-product.css";

class CartProduct extends Component {
  public productIndex;
  public productImageContainer;
  public productImage;
  public productDetails;
  public productTitle;
  public productDescription;
  public productNumberData;
  public productRating;
  public productDiscount;
  public productChoiceBlock;
  public productStock;
  public productControl;
  public productIncrButton;
  public productAmount;
  public productDecrButton;
  public productPrice;

  constructor(parentNode: HTMLElement, goodCart: ProductCart, goodData: Product, goodAmount: number, index: number) {
    super(parentNode, "div", ["cart-product"], "");

    this.productIndex = new Component(this.elem, "div", ["product-index"], `${index+1}`);
    this.productImageContainer = new Component(this.elem, "div", ["img-container"]);
    this.productImage = new Component(this.productImageContainer.elem, "img", ["product-image"]);
    this.productDetails = new Component(this.elem, "div", ["product-details"], "");
    this.productTitle = new Component(this.productDetails.elem, "div", ["product-name"], `${goodData.title}`);
    this.productDescription = new Component(this.productDetails.elem, "div", ["product-description"], `${goodData.description}`);
    this.productNumberData = new Component(this.productDetails.elem, "div", ["number-data"], "");
    this.productRating = new Component(this.productNumberData.elem, "div", ["product-rating"], `Rating: ${goodData.rating}`);
    this.productDiscount = new Component(this.productNumberData.elem, "div", ["product-discount"], `Discount: ${goodData.discountPercentage}%`);
    this.productChoiceBlock = new Component(this.elem, "div", ["product-choice"], "");
    this.productStock = new Component(this.productChoiceBlock.elem, "div", ["product-stock"], `Stock: ${goodData.stock}`);
    this.productControl = new Component(this.productChoiceBlock.elem, "div", ["product-control"], "");
    this.productIncrButton = new Component(this.productControl.elem, "button", ["control-button"], "+");
    this.productAmount = new Component(this.productControl.elem, "div", ["product-amount"], `${goodAmount}`);
    this.productDecrButton = new Component(this.productControl.elem, "button", ["control-button"], "-");
    this.productPrice = new Component(this.productChoiceBlock.elem, "div", ["product-price"], `$${goodData.price}`);

    this.productImage.elem.setAttribute("src", goodData.thumbnail);
    this.productImage.elem.setAttribute("alt", "Slide");

    this.productIncrButton.elem.addEventListener("click", () => {
      if (goodAmount < goodData.stock) {
        goodAmount ++;
        goodCart.amount ++;
        goodCart.summa += goodData.price;
        goodCart.goods[index].amount = goodAmount;
        this.productAmount.elem.textContent = `${goodAmount}`;
        // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
        document.querySelector('.cart-summa')!.textContent = `$${goodCart.summa.toFixed(2)}`;
        // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
        document.querySelector('.cart-amount')!.textContent = `${goodCart.amount}`;
        // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
        document.querySelector('.summary-total')!.textContent = `Total: $${goodCart.summa.toFixed(2)}`;
        // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
        document.querySelector('.promo-total')!.textContent = `Total: $${goodCart.summa.toFixed(2)}`;
        // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
        document.querySelector('.summary-products')!.textContent = `Products: ${goodCart.amount}`;
        localStorage.setItem('cart', JSON.stringify(goodCart));
      } 
    });

    this.productDecrButton.elem.addEventListener("click", () => {
      if (goodAmount > 0) {
        goodAmount -- ;
        goodCart.amount --;
        goodCart.summa -= goodData.price;
        goodCart.goods[index].amount = goodAmount;
        if (goodAmount > 0) {
          this.productAmount.elem.textContent = `${goodAmount}`;
          goodCart.goods[index].amount = goodAmount;
        } else {
          goodCart.goods.splice(index, 1);
          window.location.hash = `#/cart?page=${goodCart.page}`;
          location.reload();
        }
        // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
        document.querySelector('.cart-summa')!.textContent = `$${goodCart.summa.toFixed(2)}`;
        // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
        document.querySelector('.cart-amount')!.textContent = `${goodCart.amount}`;
        // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
        document.querySelector('.summary-total')!.textContent = `Total: $${goodCart.summa.toFixed(2)}`;
        // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
        document.querySelector('.summary-products')!.textContent = `Products: ${goodCart.amount}`;
        // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
        document.querySelector('.promo-total')!.textContent = `Total: $${goodCart.summa.toFixed(2)}`;
        localStorage.setItem('cart', JSON.stringify(goodCart));
      } 
    });
  }

}

export default CartProduct;