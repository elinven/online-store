class InputComponent {
  elem: HTMLInputElement;

  constructor(parentNode: HTMLElement,
              type: string,
              styles: string[] = [],
              placeholder: string,
              pattern: string)
  {
    this.elem = document.createElement('input');
    this.elem.setAttribute("type", type);
    this.elem.setAttribute("required", "required");
    this.elem.classList.add(...styles);
    this.elem.placeholder = placeholder;

    if (parentNode) {
      parentNode.append(this.elem);
    }

    //this.elem.addEventListener("input", (e) => this.getInputValue(e));
    //if (regexp) {
      //this.validInputValue(regexp);
      this.elem.setAttribute("pattern", pattern);
    //}
  }

  delete(): void {
    this.elem.remove();
  }

  // eslint-disable-next-line @typescript-eslint/no-empty-function
  //getInputValue: (event: Event) => void = () => {};
  //validInputValue = (rs: RegExp) => rs.test(<string>this.elem.getAttribute("value"));
}

export default InputComponent;