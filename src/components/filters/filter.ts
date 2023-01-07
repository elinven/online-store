import Component from "../component";
import "./style.css";
import cardsInfo from "../goods"
import {Product} from "../../types/index"


export class Filter extends Component {

  private filterName;
  private filterInput: Component | undefined;
  private filterLabel: Component | undefined;
  private filterCheckboxWrapper: Component | undefined;

  constructor(parentNode: HTMLElement, filterType: string, filterName: string) {
    super(parentNode, "div", ["filter-wrapper-option"]);

    this.filterName = new Component(this.elem, 'h2', []);
    this.filterName.elem.textContent = filterName;

    if(filterType === 'range'){
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
    }

    if(filterType === 'checkbox'){
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
    }
   
  }
}