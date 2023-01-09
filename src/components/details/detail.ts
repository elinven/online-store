import Component from "../component";
import "./detail.css";

class Detail extends Component {
  private detailTitle;
  private detailContent;

  constructor(parentNode: HTMLElement, title: string, content: string) {
    super(parentNode, "div", ["detail"], "");
    this.detailTitle = new Component(this.elem, "div", ["detail-title"], title);
    this.detailContent = new Component(this.elem, "div", ["detail-content"], content);
  }
}

export default Detail;