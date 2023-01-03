import Component from "../component";
import "./styles.css";

export class Footer extends Component {
  private footerLeftContainer;
  private githubLogo;
  private firstTeamDeveloperLink;
  private secondTeamDeveloperLink;
  private appYearContainer;
  private footerRightContainer;
  private rsschool;


  constructor(parentNode: HTMLElement) {
    super(parentNode, "div", ["footer"]);

    this.footerLeftContainer = new Component(this.elem, "div", ["footer-left"]);
    this.githubLogo = new Component(this.footerLeftContainer.elem, "div", ["github"]);
    this.firstTeamDeveloperLink = new Component(this.footerLeftContainer.elem, "a", ["first-developer"], "elinven");
    this.secondTeamDeveloperLink = new Component(this.footerLeftContainer.elem, "a", [ "second-developer"], "slysnek");
    this.appYearContainer = new Component(this.elem, "div", ["app-year"], "Online Store 2022-2023");
    this.footerRightContainer = new Component(this.elem, "div", ["footer-right"]);
    this.rsschool = new Component(this.footerRightContainer.elem, "a", ["rsschool"]);

    this.githubLogo.elem.style.backgroundImage = "./assets/svg/github.svg";
    this.firstTeamDeveloperLink.elem.setAttribute("href", "https://github.com/elinven");
    this.firstTeamDeveloperLink.elem.setAttribute("target", "_blank");
    this.secondTeamDeveloperLink.elem.setAttribute("href", "https://github.com/slysnek");
    this.secondTeamDeveloperLink.elem.setAttribute("target", "_blank");
    this.rsschool.elem.setAttribute("href", "https://rs.school/js/");
    this.footerRightContainer.elem.style.backgroundImage = "./assets/svg/rsshool.svg";
  }
}
