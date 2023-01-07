import Component from "../component";
import { Filter } from "./filter";
import "./style.css";
/* import cardsInfo from "../goods" */

export class Filters extends Component {

  private filterOption1;
  private filterOption2;
  private filterOption3;
  private filterOption4;

  constructor(parentNode: HTMLElement) {
    super(parentNode, "div", ["filter-wrapper"]);

    this.filterOption1 = new Filter(this.elem, 'range', 'Price');
    this.filterOption2 = new Filter(this.elem, 'range', 'Stock');
    this.filterOption3 = new Filter(this.elem, 'checkbox', 'Brand');
    this.filterOption4 = new Filter(this.elem, 'checkbox', 'Category');
   
    //this.githubLogo.elem.style.backgroundImage = `url("../../assets/svg/github.svg")`;
/*     this.firstTeamDeveloperLink.elem.setAttribute("href", "https://github.com/elinven");
    this.firstTeamDeveloperLink.elem.setAttribute("target", "_blank");
    this.secondTeamDeveloperLink.elem.setAttribute("href", "https://github.com/slysnek");
    this.secondTeamDeveloperLink.elem.setAttribute("target", "_blank");
    this.rsschool.elem.setAttribute("href", "https://rs.school/js/"); */
    //this.footerRightContainer.elem.style.backgroundImage = `url("../../assets/svg/rsshool.svg")`;
  }
}