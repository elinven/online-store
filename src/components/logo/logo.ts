import Component from "../component";
import "./logo.css";

class Logo extends Component {
  private logoSvg;
  private logoTitle;

  constructor(parentNode: HTMLElement) {
    super(parentNode, "div", ["logo"], "");
    this.logoSvg = new Component(this.elem, "div", ["logo-svg"]);
    this.logoTitle = new Component(this.elem, "h1", ["logo-title"], "Online Store");

    this.elem.addEventListener("click", () => this.onClickLogo());
  }

  onClickLogo = () => {
    window.location.hash = "#/";
  }
}

export default Logo;