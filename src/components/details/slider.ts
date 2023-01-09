import { Product } from "../../types/index";
import Component from "../component";
import "./slider.css";

export class GoodSlider extends Component {
  private imageContainer;
  public goodImage!: Component;
  private activeImageContainer;
  private activeGoodImage;

  constructor(parentNode: HTMLElement, goodData: Product) {
    super(parentNode, "div", ["good-slider"], "");
    
    this.imageContainer = new Component(this.elem, "div", ["image-container"]);
    this.activeImageContainer = new Component(this.elem, "div", ["active-photo"]);
    this.activeGoodImage = new Component(this.activeImageContainer.elem, "img", ["active-image"]);

    this.activeGoodImage.elem.setAttribute("src", goodData.images[0]);
    this.activeGoodImage.elem.setAttribute("alt", "Slide");

    goodData.images.forEach(ph => {
      this.goodImage = new Component(this.imageContainer.elem, "img", ["good-image"]);
      this.goodImage.elem.setAttribute("src", ph);
      this.goodImage.elem.setAttribute("alt", "Slide");
    });

    this.imageContainer.elem.addEventListener("click", (e:MouseEvent) => {
      const target = <HTMLElement>(e.target);
      if (target.classList.contains('good-image')) {
        this.activeGoodImage.elem.setAttribute("src", <string>target.getAttribute("src"));
      }
    });
  }
}

export default GoodSlider;