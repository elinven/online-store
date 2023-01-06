import Component from "../component";
import "./style.css";

class Logo extends Component {
  private logoSvg;

  constructor(parentNode: HTMLElement) {
    super(parentNode, "div", ["logo"], "");
    this.logoSvg = new Component(this.elem, "div", ["logo-svg"]);
    new Component(this.elem, "h1", ["logo-title"], "Online Store");

    //this.logoSvg.elem.style.backgroundImage = `url("../../assets/svg/shopping-bag.svg")`;

    this.elem.addEventListener("click", () => this.onClickLogo());
  }

  onClickLogo: () => void = () => {
    //
  }
}

export default Logo;