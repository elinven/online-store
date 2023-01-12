import Component from "../component";
import "./style.css";
import cardsInfo from "../goods"
import { IBaseState, Product } from "../../types/index"
import * as nouislider from "nouislider";
import "nouislider/dist/nouislider.css";
import { Model } from "../../model/Model";


export class Filter extends Component {

  private filterName;
  private filterInput: Component | undefined;
  private filterLabel: Component | undefined;
  private filterCheckboxWrapper: Component | undefined;

  constructor(parentNode: HTMLElement, filterType: string, filterName: string, filterCheckbox: (event: Event) => void, model: Model) {
    super(parentNode, "div", ["filter-wrapper-option"]);

    this.filterName = new Component(this.elem, 'h2', [], filterName);
    const state: IBaseState = model.getState();
    console.log(state);

    function updateSlider(){
      const minMax: Array<number> = [];
      let stateCategory = '';
      if (state.currentFilters.length > 0) {
        state.currentFilters.forEach((el: string) => {
          if (filterName === 'Stock') {
            stateCategory = 'Stock'
            state.products.forEach((product) => {
              const productValues = Object.values(product);
              if (productValues.includes(el))
                minMax.push(product.stock);
            })
          }
          else {
            stateCategory = 'Price'
            state.products.forEach((product) => {
              const productValues = Object.values(product);
              if (productValues.includes(el))
                minMax.push(product.price);
            })
          }
        });
      } else {
        if (filterName === 'Stock') {
          stateCategory = 'Stock'
          state.products.forEach((product) => {
            minMax.push(product.stock);
          })
        }
        else {
          stateCategory = 'Price'
          state.products.forEach((product) => {
            minMax.push(product.price);
          })
        }
      }
      minMax.sort((a, b) => a - b)
      return minMax;
    }

    if (filterType === 'range') {
      const minMax = updateSlider();
      this.filterInput = new Component(this.elem, 'div', ['test-filter']);
      const slider = 
      nouislider.create(this.filterInput.elem, {
        start: [minMax[0], minMax[minMax.length - 1]],
        step: 1,
        connect: true,
        range: {
          'min': minMax[0],
          'max': minMax[minMax.length - 1]
        },
        tooltips: [
          true,
          true
        ],
      });
      slider.on('change', ()=>{
        const state:IBaseState = model.getState();
        updateSlider()
        const values = slider.get(true)
        console.log(values);
        const stringValues = values.toString();
        const splitValues = stringValues.split(',')
        if(filterName === 'Stock'){
          model.setState({
            ...state,
            minStock: +splitValues[0],
            maxStock: +splitValues[1]
          })
        } else {
          model.setState({
            ...state,
            minPrice: +splitValues[0],
            maxPrice: +splitValues[1]
          })
        }
        console.log(state);

      })
    }

    function updateCheckboxes(){
      const categories: Array<string> = [];
      if (state.currentFilters.length > 0) {
        state.currentFilters.forEach((el: string) => {
          if (filterName === 'Brand') {
            state.products.forEach((product) => {
              const productValues = Object.values(product);
              if (productValues.includes(el))
                categories.push(product.brand);
            })
          }
          else {
            state.products.forEach((product) => {
              const productValues = Object.values(product);
              if (productValues.includes(el))
                categories.push(product.category);
            })
          }
        });
      } else {
        if (filterName === 'Brand') {
          state.products.forEach((product) => {
            categories.push(product.brand);
          })
        }
        else {
          state.products.forEach((product) => {
            categories.push(product.category);
          })
        }
      }
      return categories;
    }

    const buildCheckboxes = () =>{
  if (filterType === 'checkbox') {
    const categories = updateCheckboxes()
    const allCategories = new Set(...[categories]);
    allCategories.forEach((el) => {
      this.filterCheckboxWrapper = new Component(this.elem, 'div', ['category-option']);
      this.filterLabel = new Component(this.filterCheckboxWrapper.elem, 'label', ['category-label'], el)
      this.filterInput = new Component(this.filterLabel.elem, 'input', []);
      this.filterLabel.elem.setAttribute('for', el)
      this.filterInput.elem.setAttribute('type', filterType);
      this.filterInput.elem.setAttribute('id', el);

      this.filterInput.elem.addEventListener('change', filterCheckbox);
    })
  }
}

buildCheckboxes()

model.subscribe((state) => {
  buildCheckboxes()
})

  }
}
