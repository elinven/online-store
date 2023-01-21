import { Product, ProductCart } from "../../types/index";
import Component from "../component";
import goRouter from "../utils/go-router";
import "./product-buttons.css";

class ProductButtons extends Component {
  private goodPrice;
  public addToCartButton;
  public buyNowButton; 

  constructor(parentNode: HTMLElement, goodData: Product, goodCart: ProductCart) {
    super(parentNode, "div", ["product-buttons"], "");

    this.goodPrice = new Component(this.elem, "div", ["good-price"], `$${goodData.price}`);
    this.addToCartButton = new Component(this.elem, "button", ["add-button"], goodCart.goods.some((e) => e.product.id === goodData.id) ? "DROP FROM CART" : "ADD TO CART");
    this.buyNowButton = new Component(this.elem, "button", ["buy-button"], "BUY NOW");

    this.addToCartButton.elem.onclick = () => {
      if (!goodCart.goods.some((e) => e.product.id === goodData.id)) {
        goodCart.goods.push({product: goodData, amount: 1});
        goodCart.amount ++;
        goodCart.summa += goodData.price;
        this.addToCartButton.elem.textContent = "DROP FROM CART";
        (<Element>document.querySelector('.cart-summa')).textContent = `$${goodCart.summa.toFixed(2)}`;
        (<Element>document.querySelector('.cart-amount')).textContent = `${goodCart.amount}`;
        localStorage.setItem('cart', JSON.stringify(goodCart));
      } else {
        const dropIndex = goodCart.goods.findIndex((e) => e.product.id === goodData.id);
        goodCart.amount -= goodCart.goods[dropIndex].amount;
        goodCart.summa -= goodCart.goods[dropIndex].product.price * goodCart.goods[dropIndex].amount;
        goodCart.goods.splice(dropIndex, 1);
        this.addToCartButton.elem.textContent = "ADD TO CART";
        (<Element>document.querySelector('.cart-summa')).textContent = `$${goodCart.summa.toFixed(2)}`;
        (<Element>document.querySelector('.cart-amount')).textContent = `${goodCart.amount}`;
        localStorage.setItem('cart', JSON.stringify(goodCart));
      }
    }

    this.buyNowButton.elem.onclick = () => {
      if (!goodCart.goods.some((e) => e.product.id === goodData.id)) {
        goodCart.goods.push({product: goodData, amount: 1});
        goodCart.amount ++;
        goodCart.summa += goodData.price;
        goodCart.page = Math.ceil(goodCart.goods.length/goodCart.limit);
        (<Element>document.querySelector('.cart-summa')).textContent = `$${goodCart.summa.toFixed(2)}`;
        (<Element>document.querySelector('.cart-amount')).textContent = `${goodCart.amount}`;
      } else {
        goodCart.page = Math.ceil((goodCart.goods.findIndex((e) => e.product.id === goodData.id) + 1)/goodCart.limit);
      }
      localStorage.setItem('buy', 'true');
      goRouter(`#/cart?page=${goodCart.page}`, goodCart);
    }
  }
}

export default ProductButtons;