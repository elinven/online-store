import { IBaseState } from "../../types/index";
import { Model } from "../../model/Model";
import Component from "../component";
import { Filter } from "./filter";
import * as nouislider from "nouislider";
import "nouislider/dist/nouislider.css";
import "./style.css";



export class Filters extends Component {


  private filterOption1;
  private filterOption2;
  private filterOption3;
  private filterOption4;
  private testFilter;
  private testFilter2;
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

    //nouislider

    this.resetFilters = new Component(this.elem, 'button', ['reset-filter-button'], 'Reset Filters')

    this.testFilter = new Component(this.elem, 'div', ['test-filter']);
    this.testFilter2 = new Component(this.elem, 'div', ['test-filter']);
    const testFilterTarget = document.querySelector('.test-filter') as HTMLElement;
    const testFilterTarget2 = document.querySelectorAll('.test-filter')[1] as HTMLElement;

    nouislider.create(testFilterTarget, {
      start: [20, 80],
      connect: true,
      range: {
          'min': 0,
          'max': 100
      },
      pips: {
        mode: nouislider.PipsMode.Steps,
        density: 6,
      }
  });
    nouislider.create(testFilterTarget2, {
      start: [20, 80],
      connect: true,
      range: {
          'min': 0,
          'max': 100
      },
      pips: {
        mode: nouislider.PipsMode.Steps,
        density: 8,
      }
  });


    this.filterOption1 = new Filter(this.elem, 'range', 'Price', filterCheckbox);
    this.filterOption2 = new Filter(this.elem, 'range', 'Stock', filterCheckbox);
    this.filterOption3 = new Filter(this.elem, 'checkbox', 'Brand', filterCheckbox);
    this.filterOption4 = new Filter(this.elem, 'checkbox', 'Categories', filterCheckbox);
  }
}


