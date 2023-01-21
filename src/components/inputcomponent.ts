class InputComponent {
  elem: HTMLInputElement;

  constructor(parentNode: HTMLElement,
              type: string,
              styles: string[] = [],
              placeholder: string,
              pattern?: string)
  {
    this.elem = document.createElement('input');
    this.elem.setAttribute("type", type);
    this.elem.setAttribute("required", "required");
    this.elem.classList.add(...styles);
    this.elem.placeholder = placeholder;

    if (parentNode) {
      parentNode.append(this.elem);
    }

    if (pattern) {
      this.elem.setAttribute("pattern", pattern);
    }
  }

  delete(): void {
    this.elem.remove();
  }

}

export default InputComponent;