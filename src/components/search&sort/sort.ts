import Component from "../component";
import "./style.css";

export class Sort extends Component {

  private sortField: Component | undefined;
  private sortALPH_ASC: Component | undefined;
  private sortALPH_DESC: Component | undefined;
  private sortPRICE_ASC: Component | undefined;
  private sortPRICS_DESC: Component | undefined;

  constructor(parentNode: HTMLElement) {
    super(parentNode, "div", ["sort-wrapper"]);

    this.sortField = new Component(this.elem, 'select', ['sort-select'], 'Sort Options');
    this.sortALPH_ASC = new Component(this.sortField.elem, 'option', ['goods-sort'], 'Alphabet ASC');
    this.sortALPH_DESC = new Component(this.sortField.elem, 'option', ['goods-sort'], 'Alphabet DESC');
    this.sortPRICE_ASC = new Component(this.sortField.elem, 'option', ['goods-sort'], 'Price ASC');
    this.sortPRICS_DESC = new Component(this.sortField.elem, 'option', ['goods-sort'], 'Price DESC');
  
    this.sortALPH_ASC.elem.setAttribute('value', 'alph_asc')
    this.sortALPH_DESC.elem.setAttribute('value', 'alph_desc')
    this.sortPRICE_ASC.elem.setAttribute('value', 'alph_asc')
    this.sortPRICS_DESC.elem.setAttribute('value', 'alph_desc')
  }
}