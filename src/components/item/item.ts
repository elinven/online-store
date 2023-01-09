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
  private itemButtonAdd: Component | undefined;
  private itemButtonDetails: Component | undefined;

  constructor(parentNode: HTMLElement, itemName: string, itemBrand: string,
     itemCategory: string,  itemImages:string, itemPrice:string, itemDiscount:string, itemRating:string, itemStock: string, id: number) {
    super(parentNode, "div", ["goods-item"]);

    this.itemUpper = new Component(this.elem, 'div', ['goods-item-upper-section'])
    this.itemName = new Component(this.itemUpper.elem, 'h3', ['goods-item-name'], itemName)
    this.itemCatAndBrandWrap = new Component(this.itemUpper.elem, 'div', ['goods-item-category-and-brand-wrapper'])
    this.itemBrand = new Component(this.itemCatAndBrandWrap.elem, 'div', ['goods-item-info-brand'], itemBrand)
    this.itemCategory = new Component(this.itemCatAndBrandWrap.elem, 'div', ['goods-item-info-category'], itemCategory)

    this.itemPhoto = new Component(this.elem, 'div', ['goods-item-photo-wrapper'])
    this.itemPhoto.elem.style.backgroundImage = `url(${itemImages})`;

    this.itemPriceInfo = new Component(this.elem, 'div', ['goods-item-info'])
    this.itemPrice = new Component(this.itemPriceInfo.elem, 'div', ['goods-item-info-price'], `${itemPrice}$`)
    this.itemDiscount = new Component(this.itemPriceInfo.elem, 'div', ['goods-item-info-discount'], `(-${itemDiscount}%)`)

    this.itemLower = new Component(this.elem, 'div', ['goods-item-lower-section'])
    this.itemRatingAndStockWrap = new Component(this.itemLower.elem, 'div', ['goods-item-rating-and-stock'])
    this.itemRating = new Component(this.itemRatingAndStockWrap.elem, 'div', ['goods-item-rating'], `${itemRating}★`)
    this.itemStock = new Component(this.itemRatingAndStockWrap.elem, 'div', ['goods-item-stock'], `${itemStock} left`)

    this.itemButtons = new Component(this.itemLower.elem, 'div', ['goods-item-buttons'])
    this.itemButtonDetails = new Component(this.itemButtons.elem, 'button', ['goods-item-button', 'goods-item-details'], 'Details')
    this.itemButtonAdd = new Component(this.itemButtons.elem, 'button', ['goods-item-button', 'goods-item-add'], '+')

    this.itemButtonDetails.elem.addEventListener("click", () => {
      window.location.hash = `#/product-details/${id}`;
    });

  }
}