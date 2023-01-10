import { Product, ProductCart } from "../../types/index";
import Component from "../component";
import "./product-buttons.css";

class ProductButtons extends Component {
  private goodPrice;
  public addToCartButton;
  public buyNowButton; 

  constructor(parentNode: HTMLElement, goodData: Product, goodCart: ProductCart) {
    super(parentNode, "div", ["product-buttons"], "");

    this.goodPrice = new Component(this.elem, "div", ["good-price"], `$${goodData.price}`);
    this.addToCartButton = new Component(this.elem, "button", ["product-button"], goodCart.goods.some((e) => e.product.id === goodData.id) ? "DROP FROM CART" : "ADD TO CART");
    this.buyNowButton = new Component(this.elem, "button", ["product-button"], "BUY NOW");

    this.addToCartButton.elem.onclick = () => {
      if (!goodCart.goods.some((e) => e.product.id === goodData.id)) {
        goodCart.goods.push({product: goodData, amount: 1});
        goodCart.amount ++;
        goodCart.summa += goodData.price;
        this.addToCartButton.elem.textContent = "DROP FROM CART";
        // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
        document.querySelector('.cart-summa')!.textContent = `$${goodCart.summa.toFixed(2)}`;
        // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
        document.querySelector('.cart-amount')!.textContent = `${goodCart.amount}`;
        localStorage.setItem('cart', JSON.stringify(goodCart));
      } else {
        const dropIndex = goodCart.goods.findIndex((e) => e.product.id === goodData.id);
        goodCart.amount -= goodCart.goods[dropIndex].amount;
        goodCart.summa -= goodCart.goods[dropIndex].product.price * goodCart.goods[dropIndex].amount;
        goodCart.goods.splice(dropIndex, 1);
        this.addToCartButton.elem.textContent = "ADD TO CART";
        // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
        document.querySelector('.cart-summa')!.textContent = `$${goodCart.summa.toFixed(2)}`;
        // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
        document.querySelector('.cart-amount')!.textContent = `${goodCart.amount}`;
        localStorage.setItem('cart', JSON.stringify(goodCart));
        console.log(goodCart);
      }
    }
    
    this.buyNowButton.elem.onclick = () => {
      if (!goodCart.goods.some((e) => e.product.id === goodData.id)) {
        goodCart.goods.push({product: goodData, amount: 1});
        goodCart.amount ++;
        goodCart.summa += goodData.price;
        // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
        document.querySelector('.cart-summa')!.textContent = `$${goodCart.summa.toFixed(2)}`;
        // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
        document.querySelector('.cart-amount')!.textContent = `${goodCart.amount}`;
        localStorage.setItem('cart', JSON.stringify(goodCart));
      }
      window.location.hash = "#/cart";
    }
  }

}

export default ProductButtons;