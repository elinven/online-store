import Component from "../component";
import "./style.css";
import cardsInfo from "../goods"
import {Product} from "../../types/index"


export class Filter extends Component {

  private filterName;
  private filterInput;

  constructor(parentNode: HTMLElement, filterType: string, filterName: string) {
    super(parentNode, "div", ["filter-wrapper-option"]);

    this.filterName = new Component(this.elem, 'h2', []);
    this.filterInput = new Component(this.elem, 'input', []);

    this.filterName.elem.textContent = filterName;
    this.filterInput.elem.setAttribute('type', filterType);
    
    if(filterType === 'range' && filterName === 'Stock'){
      const minMax:Array<number> = [];
      cardsInfo().then((res) => {
        console.log(res);
        res.products.forEach((el:Product) => {
          minMax.push(el.stock)
        });
        minMax.sort((a, b) => a - b)
        this.filterInput.elem.setAttribute('min', minMax[0].toString())
        this.filterInput.elem.setAttribute('max', minMax[minMax.length-1].toString())
      });
    }
   
  }
}