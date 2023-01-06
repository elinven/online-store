import Component from "../component";
import "./style.css";

export class Filter extends Component {
  private categoryFilter;
  private brandFilter;
  private priceFilter;
  private stockFilter;

  constructor(parentNode: HTMLElement) {
    super(parentNode, "div", ["footer"]);

    this.categoryFilter = new Component(this.elem, "div", ["footer-left"]);
    this.brandFilter = new Component(this.elem, "div", ["footer-left"]);
    this.footerLeftContainer = new Component(this.elem, "div", ["footer-left"]);
    this.footerLeftContainer = new Component(this.elem, "div", ["footer-left"]);


    //this.githubLogo.elem.style.backgroundImage = `url("../../assets/svg/github.svg")`;
    this.firstTeamDeveloperLink.elem.setAttribute("href", "https://github.com/elinven");
    this.firstTeamDeveloperLink.elem.setAttribute("target", "_blank");
    this.secondTeamDeveloperLink.elem.setAttribute("href", "https://github.com/slysnek");
    this.secondTeamDeveloperLink.elem.setAttribute("target", "_blank");
    this.rsschool.elem.setAttribute("href", "https://rs.school/js/");
    //this.footerRightContainer.elem.style.backgroundImage = `url("../../assets/svg/rsshool.svg")`;
  }
}