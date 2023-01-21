import Component from "../component";
import InputComponent from "../inputcomponent";

const onInputChange = (regexp: RegExp, inputElement: InputComponent, errorElement: Component, err: string) => {
  if (!regexp.test(inputElement.elem.value)) {
    errorElement.elem.textContent = err;
  } else {
    errorElement.elem.textContent = "";
  }
}

export default onInputChange;