import Component from "../component";
import "./style.css";

export class Search extends Component {

  private searchField: Component | undefined;

  constructor(parentNode: HTMLElement, onKeyDown: (event: KeyboardEvent) => void) {
    super(parentNode, "div", ["search-wrapper"]);

    this.searchField = new Component(this.elem, 'input', ['goods-search']);
    this.searchField.elem.setAttribute('placeholder', 'Find item');
    this.searchField.elem.addEventListener('keyup', onKeyDown);
  }
}