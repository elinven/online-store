import Component from "../component";
import "./style.css";
/* import cardsInfo from "../goods" */

export class Filter extends Component {
  private categoryFilter;
  private brandFilter;
  private priceFilter;
  private stockFilter;

  constructor(parentNode: HTMLElement) {
    super(parentNode, "div", ["filter-wrapper"]);

    this.categoryFilter = new Component(this.elem, "div", ["filter-wrapper-option"]);
    this.brandFilter = new Component(this.elem, "div", ["filter-wrapper-option"]);
    this.priceFilter = new Component(this.elem, "div", ["filter-wrapper-option"]);
    this.stockFilter = new Component(this.elem, "div", ["filter-wrapper-option"]);


    //this.githubLogo.elem.style.backgroundImage = `url("../../assets/svg/github.svg")`;
/*     this.firstTeamDeveloperLink.elem.setAttribute("href", "https://github.com/elinven");
    this.firstTeamDeveloperLink.elem.setAttribute("target", "_blank");
    this.secondTeamDeveloperLink.elem.setAttribute("href", "https://github.com/slysnek");
    this.secondTeamDeveloperLink.elem.setAttribute("target", "_blank");
    this.rsschool.elem.setAttribute("href", "https://rs.school/js/"); */
    //this.footerRightContainer.elem.style.backgroundImage = `url("../../assets/svg/rsshool.svg")`;
  }
}