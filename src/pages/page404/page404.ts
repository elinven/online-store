import Component from "../../components/component";
import "./page404.css";

export class Page404 extends Component {
  private error404;

  constructor(parentNode: HTMLElement) {
    super(parentNode, "div", ["page-404"]);

    this.error404 = new Component(this.elem, "h1", ["error-404"], "PAGE NOT FOUND (404)");

  }
}
