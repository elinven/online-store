import { Product, ProductCart } from "../../types/index";
import Component from "../component";
import "./product-buttons.css";

class ProductButtons extends Component {
  private goodPrice;
  public addToCartButton;
  public buyNowButton; 

  constructor(parentNode: HTMLElement, goodData: Product, goodCart: ProductCart) {
    super(parentNode, "div", ["product-buttons"], "");

    this.goodPrice = new Component(this.elem, "div", ["good-price"], '$' + String(goodData.price));
    this.addToCartButton = new Component(this.elem, "button", ["add-product"], goodCart.goods.includes(goodData) ? "DROP FROM CART" : "ADD TO CART");
    this.buyNowButton = new Component(this.elem, "button", ["buy-product"], "BUY NOW");

    //this.addToCartButton.elem.onclick = () => this.onAddToCartButtonClick();
    this.addToCartButton.elem.onclick = () => {
      if (!goodCart.goods.includes(goodData)) {
        goodCart.goods.push(goodData);
        goodCart.amount ++;
        goodCart.summa += goodData.price;
        // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
        document.querySelector('.cart-summa')!.textContent = String(goodCart.summa);
        // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
        document.querySelector('.cart-content')!.textContent = String(goodCart.amount);
        localStorage.setItem('good-cart', JSON.stringify(goodCart));
      }
    }
    
    //this.buyNowButton.elem.onclick = () => this.onBuyNowButtonClick();
    this.buyNowButton.elem.onclick = () => {
      if (!goodCart.goods.includes(goodData)) {
        goodCart.goods.push(goodData);
        goodCart.amount ++;
        goodCart.summa += goodData.price;
        // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
        document.querySelector('.cart-summa')!.textContent = String(goodCart.summa);
        // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
        document.querySelector('.cart-content')!.textContent = String(goodCart.amount);
        localStorage.setItem('good-cart', JSON.stringify(goodCart));
        localStorage.setItem('good-cart', JSON.stringify(goodCart));
      }
      window.location.hash = "#/cart";
    }
  }

}

export default ProductButtons;