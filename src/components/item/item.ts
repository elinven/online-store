import { Product, ProductCart } from "../../types/index";
import Component from "../component";
import "./style.css";

export class Item extends Component {

  private itemUpper: Component | undefined;
  private itemCatAndBrandWrap: Component | undefined;
  private itemPhoto: Component | undefined;
  private itemPriceInfo: Component | undefined;
  private itemLower: Component | undefined;
  private itemRatingAndStockWrap: Component | undefined;
  private itemButtons: Component | undefined;

  private itemName: Component | undefined;
  private itemBrand: Component | undefined;
  private itemCategory: Component | undefined;
  private itemPrice: Component | undefined;
  private itemDiscount: Component | undefined;
  private itemRating: Component | undefined;
  private itemStock: Component | undefined;
  private itemButtonAdd: Component;
  private itemButtonDetails: Component | undefined;

  constructor(parentNode: HTMLElement, goodCart: ProductCart, goodData: Product) {//itemName: string, itemBrand: string,
     //itemCategory: string,  itemImages:string, itemPrice:string, itemDiscount:string, itemRating:string, itemStock: string, id: number) {
    super(parentNode, "div", ["goods-item"]);

    this.itemUpper = new Component(this.elem, 'div', ['goods-item-upper-section'])
    this.itemName = new Component(this.itemUpper.elem, 'h3', ['goods-item-name'], goodData.title)
    this.itemCatAndBrandWrap = new Component(this.itemUpper.elem, 'div', ['goods-item-category-and-brand-wrapper'])
    this.itemBrand = new Component(this.itemCatAndBrandWrap.elem, 'div', ['goods-item-info-brand'], goodData.brand)
    this.itemCategory = new Component(this.itemCatAndBrandWrap.elem, 'div', ['goods-item-info-category'], goodData.category)

    this.itemPhoto = new Component(this.elem, 'div', ['goods-item-photo-wrapper'])
    this.itemPhoto.elem.style.backgroundImage = `url(${goodData.thumbnail})`;

    this.itemPriceInfo = new Component(this.elem, 'div', ['goods-item-info'])
    this.itemPrice = new Component(this.itemPriceInfo.elem, 'div', ['goods-item-info-price'], `${goodData.price}$`)
    this.itemDiscount = new Component(this.itemPriceInfo.elem, 'div', ['goods-item-info-discount'], `(-${goodData.discountPercentage}%)`)

    this.itemLower = new Component(this.elem, 'div', ['goods-item-lower-section'])
    this.itemRatingAndStockWrap = new Component(this.itemLower.elem, 'div', ['goods-item-rating-and-stock'])
    this.itemRating = new Component(this.itemRatingAndStockWrap.elem, 'div', ['goods-item-rating'], `${goodData.rating}★`)
    this.itemStock = new Component(this.itemRatingAndStockWrap.elem, 'div', ['goods-item-stock'], `${goodData.stock} left`)

    this.itemButtons = new Component(this.itemLower.elem, 'div', ['goods-item-buttons'])
    this.itemButtonDetails = new Component(this.itemButtons.elem, 'button', ['goods-item-button', 'goods-item-details'], 'Details')
    this.itemButtonAdd = new Component(this.itemButtons.elem, 'button', ['goods-item-button', 'goods-item-add'], goodCart.goods.some((e) => e.product.id === goodData.id) ? "-" : "+")

    this.itemButtonDetails.elem.addEventListener("click", () => {
      window.location.hash = `#/product-details/${goodData.id}`;
    });

    this.itemButtonAdd.elem.onclick = () => {
      if (!goodCart.goods.some((e) => e.product.id === goodData.id)) {
        goodCart.goods.push({product: goodData, amount: 1});
        goodCart.amount ++;
        goodCart.summa += goodData.price;
        if (goodCart.amount === 1) {
          goodCart.page = 1;
        }
        this.itemButtonAdd.elem.textContent = "-";
        (<Element>document.querySelector('.cart-summa')).textContent = `$${goodCart.summa.toFixed(2)}`;
        (<Element>document.querySelector('.cart-amount')).textContent = `${goodCart.amount}`;
        localStorage.setItem('cart', JSON.stringify(goodCart));
      } else {
        const dropIndex = goodCart.goods.findIndex((e) => e.product.id === goodData.id);
        goodCart.amount -= goodCart.goods[dropIndex].amount;
        goodCart.summa -= goodCart.goods[dropIndex].product.price * goodCart.goods[dropIndex].amount;
        goodCart.goods.splice(dropIndex, 1);
        this.itemButtonAdd.elem.textContent = "+";
        (<Element>document.querySelector('.cart-summa')).textContent = `$${goodCart.summa.toFixed(2)}`;
        (<Element>document.querySelector('.cart-amount')).textContent = `${goodCart.amount}`;
        localStorage.setItem('cart', JSON.stringify(goodCart));
        console.log(goodCart);
      }
    }

  }
}