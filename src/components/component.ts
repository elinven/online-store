class Component {
  elem: HTMLElement;

  constructor(parentNode: HTMLElement,
              tagName: keyof HTMLElementTagNameMap = "div",
              styles: string[] = [],
              content = "")
  {
    this.elem = document.createElement(tagName);
    this.elem.classList.add(...styles);
    this.elem.textContent = content;

    if (parentNode) {
      parentNode.append(this.elem);
    }
  }

  delete(): void {
    this.elem.remove();
  }
}

export default Component;