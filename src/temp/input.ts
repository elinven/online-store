//import Component from "../component";
import "./input.css";

export class AppInput  {
  elem: HTMLInputElement;
  //getInputValue: (event: Event) => void = () => {};
  constructor(parentNode: HTMLElement,
              type: string,
              styles: string[] = [],
              initValue?: string,
              regexp?: RegExp) {
    //super(parentNode, "input", ["app-input"]);
    this.elem = document.createElement("input");
    this.elem.setAttribute("type", type);
    this.elem.classList.add(...styles);

    if (initValue) {
      this.elem.setAttribute("value", initValue);
    }

    this.elem.addEventListener("input", (e) => this.getInputValue(e));

    if (regexp) {
      this.validInputValue(regexp);
    }
  }

  // eslint-disable-next-line @typescript-eslint/no-empty-function
  getInputValue: (event: Event) => void = () => {};
  validInputValue = (rs: RegExp) => rs.test(<string>this.elem.getAttribute("value"));
}