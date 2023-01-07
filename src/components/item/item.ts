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
     itemCategory: string,  itemImages:string, itemPrice:string, itemDiscount:string, itemRating:string, itemStock: string) {
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



/*     if(filterType === 'range'){
      const minMax:Array<number> = [];
      cardsInfo().then((res) => {
        res.products.forEach((el:Product) => {
          console.log(el);
          if(filterName === 'Stock'){
            minMax.push(el.stock);
          } else{
            minMax.push(el.price);
          }
        });
        minMax.sort((a, b) => a - b)
        this.filterInput = new Component(this.elem, 'input', []);
        this.filterInput.elem.setAttribute('type', filterType);
        this.filterInput.elem.setAttribute('min', minMax[0].toString())
        this.filterInput.elem.setAttribute('max', minMax[minMax.length-1].toString())
      });
    } */

/*     if(filterType === 'checkbox'){
      const categories:Array<string> = [];
      cardsInfo().then((res) => {
        res.products.forEach((el:Product) => {
          if(filterName === 'Categories'){
            categories.push(el.category)
          } else {
            categories.push(el.brand)
          }
        });
        const allCategories = new Set(...[categories]);
        allCategories.forEach((el) => {
          console.log(el);
          this.filterCheckboxWrapper = new Component(this.elem, 'div', ['category-option']);
          this.filterLabel = new Component(this.filterCheckboxWrapper.elem, 'label', ['category-label'], el)
          this.filterInput = new Component(this.filterCheckboxWrapper.elem, 'input', []);
          this.filterLabel.elem.setAttribute ('for', el)
          this.filterInput.elem.setAttribute('type', filterType);
          this.filterInput.elem.setAttribute('id', el);
        })
      });
    } */
   
  }
}