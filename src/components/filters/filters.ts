import { IBaseState } from "../../types/index";
import { Model } from "../../model/Model";
import Component from "../component";
import { Filter } from "./filter";
import "./style.css";


export class Filters extends Component {


  private filterOption1;
  private testFilter;
  private filterOption2;
  private filterOption3;
  private filterOption4;
  public resetFilters;
  

  constructor(parentNode: HTMLElement, model: Model) {
    super(parentNode, "div", ["filter-wrapper"]);

    function removeFilter(arr: IBaseState["currentFilters"], value:string) {
      const index = arr.indexOf(value);
      if (index > -1) {
        arr.splice(index, 1);
      }
      return arr;
    }
    
    const filterCheckbox = (event: Event) => {
      const target = event.target as HTMLInputElement;
      const state:IBaseState = model.getState();
      if(state.currentFilters.includes(target.id)){
        removeFilter(state.currentFilters, target.id)
      } else{
        state.currentFilters.push(target.id);
      }
      model.setState({
        ...state,
      });
    };

    this.resetFilters = new Component(this.elem, 'button', ['reset-filter-button'], 'Reset Filters')
    this.filterOption1 = new Filter(this.elem, 'range', 'Price', filterCheckbox);
    this.filterOption2 = new Filter(this.elem, 'range', 'Stock', filterCheckbox);

    this.testFilter = new Component(this.elem, 'div', ['test-filter'])

    this.filterOption3 = new Filter(this.elem, 'checkbox', 'Brand', filterCheckbox);
    this.filterOption4 = new Filter(this.elem, 'checkbox', 'Categories', filterCheckbox);
   

    let testFilterDiv = document.querySelector('.test-filter')

  }
}