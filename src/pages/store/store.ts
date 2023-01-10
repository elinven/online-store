import { stat } from "fs";
import Component from "../../components/component";
import { Filters } from "../../components/filters/filters"
import { Items } from "../../components/item/items"
import { Search } from "../../components/search&sort/search";
import { Sort } from "../../components/search&sort/sort";
import { Model } from "../../model/Model";
import { IBaseState, Product } from "../../types/index";
import "./store.css";

export class StorePage extends Component {
  private filterWrapper;
  private goodsWrapper;
  private items;
  private searchAndSortWrapper;
  private search;
  private sort;
  private foundWrapper?: Component;

  constructor(parentNode: HTMLElement, model: Model) {
    super(parentNode, "div", ["store-page"]);

    //search
    const onKeyDown = (event: KeyboardEvent) => {
      const target = event.target as HTMLInputElement;
      const state:IBaseState = model.getState();
      model.setState({
        ...state,
        searchQuery: target.value,
      });
    };

    //sort
    const selectSort = (event: Event) => {
      const target = event.target as HTMLInputElement;
      const state:IBaseState = model.getState();
      model.setState({
        ...state,
        sortOrder: target.value,
      });
    };

    const state = model.getState();

    this.filterWrapper = new Filters(this.elem, model);
    this.goodsWrapper = new Component(this.elem, 'div', ['goods-wrapper']);
    this.searchAndSortWrapper = new Component(this.goodsWrapper.elem, 'div', ['sort-and-search-wrapper']);
    this.search = new Search(this.searchAndSortWrapper.elem, onKeyDown);
    this.sort = new Sort(this.searchAndSortWrapper.elem, selectSort);
    this.foundWrapper = new Component(this.searchAndSortWrapper.elem, 'div', [], `Found: ${state.products.length.toString()} items`)
    this.items = new Items(this.goodsWrapper.elem, state.products);

    model.subscribe((state) => {
      //search
      const products = state.products.filter((item) => {
        if (!state.searchQuery) {
          return true;
        }
        const query = state.searchQuery.toLowerCase();
        if(item.title.toLowerCase().match(query)){
          return item.title.toLowerCase().match(query)
        } else if(item.brand.toLowerCase().match(query)){
          return item.brand.toLowerCase().match(query)
        }  else if(item.category.toLowerCase().match(query)){
          return item.category.toLowerCase().match(query)
        }  else if(item.price.toString().toLowerCase().match(query)){
          return item.price.toString().toLowerCase().match(query)
        }  else if(item.rating.toString().toLowerCase().match(query)){
          return item.rating.toString().toLowerCase().match(query)
        }   else if(item.stock.toString().toLowerCase().match(query)){
          return item.stock.toString().toLowerCase().match(query)
        }
      });

      //filters
      const filteredProducts = state.currentFilters;

      const productsAfterFilter = products.filter((item) => {
        if (filteredProducts.length === 0) {
          return true;
        } else{
          let filter = false;
          filteredProducts.forEach((filteredProduct) => {
            if(item.brand === filteredProduct || item.category === filteredProduct){
              filter = true;
            }
          })
          return filter;
        }
      })

      //filteredProducts = [{id: 1, brand: 'apple'}]
      //item = 'apple'

      //sort
      const sortingOrder = state.sortOrder;
      if(sortingOrder ==='alph_asc'){
        productsAfterFilter.sort((a:Product, b:Product) => {
          if(a.title < b.title) { return -1; }
          else { return 1; }
        })
      } else if (sortingOrder ==='alph_desc'){
        productsAfterFilter.sort((a:Product, b:Product) => {
          if(a.title < b.title) { return 1; }
          else { return -1; }
        })
      } else if (sortingOrder ==='price_asc'){
        productsAfterFilter.sort((a:Product, b:Product) => {
          if(a.price < b.price) { return -1; }
          else { return 1; }
        })
      } else if (sortingOrder ==='price_desc'){
        productsAfterFilter.sort((a:Product, b:Product) => {
          if(a.price < b.price) { return 1; }
          else { return -1; }
        })
      }

      const itemsFound = productsAfterFilter.length.toString();

      this.items.delete();
      this.foundWrapper?.delete()
      this.items = new Items(this.goodsWrapper.elem, productsAfterFilter);
      this.foundWrapper = new Component(this.searchAndSortWrapper.elem, 'div', [], `Found: ${itemsFound} items`)
    });

  }
}