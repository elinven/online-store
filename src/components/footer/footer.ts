import Component from "../component";
import "./footer.css";

export class Footer extends Component {
  private footerLeftContainer;
  private githubLogo;
  private teamDeveloperLinks;
  private firstTeamDeveloperLink;
  private secondTeamDeveloperLink;
  private appYearContainer;
  private footerRightContainer;
  private rsschool;

  constructor(parentNode: HTMLElement) {
    super(parentNode, "div", ["footer"]);

    this.footerLeftContainer = new Component(this.elem, "div", ["footer-left"]);
    this.githubLogo = new Component(this.footerLeftContainer.elem, "a", ["github-logo"]);
    this.teamDeveloperLinks = new Component(this.footerLeftContainer.elem, "div", ["team-developers"]);
    this.firstTeamDeveloperLink = new Component(this.teamDeveloperLinks.elem, "a", ["app-developer"], "elinven");
    this.secondTeamDeveloperLink = new Component(this.teamDeveloperLinks.elem, "a", [ "app-developer"], "slysnek");
    this.appYearContainer = new Component(this.elem, "div", ["app-year"], "Online Store 2023");
    this.footerRightContainer = new Component(this.elem, "div", ["footer-right"]);
    this.rsschool = new Component(this.footerRightContainer.elem, "a", ["rsschool"]);

    this.githubLogo.elem.setAttribute("href", "https://github.com/rolling-scopes-school/tasks/tree/master/tasks/online-store-team");
    this.firstTeamDeveloperLink.elem.setAttribute("href", "https://github.com/elinven");
    this.firstTeamDeveloperLink.elem.setAttribute("target", "_blank");
    this.secondTeamDeveloperLink.elem.setAttribute("href", "https://github.com/slysnek");
    this.secondTeamDeveloperLink.elem.setAttribute("target", "_blank");
    this.rsschool.elem.setAttribute("href", "https://rs.school/js/");
  }
}
