import Component from "../component";
import InputComponent from "../inputcomponent";
import "./person.css";

export const MAIL_REGEXP = /^(([^<>()[\].,;:\s@"]+(\.[^<>()[\].,;:\s@"]+)*)|(".+"))@(([^<>()[\].,;:\s@"]+\.)+[^<>()[\].,;:\s@"]{2,})$/iu;

export class Person extends Component {
  public personTitle;
  public personName;
  public personPhoneNumber;
  public personDeliveryAddress;
  public personMail;
  public personNameError;
  public personPhoneNumberError;
  public personDeliveryAddressError;
  public personMailError;

  constructor(parentNode: HTMLElement) {
    super(parentNode, "div", ["person-container"]);
  
    this.personTitle = new Component(this.elem, "div", ["person-title"], "Personal detail");
    this.personName = new InputComponent(this.elem, "text", ["person-input", "person-name"], "Name");
    this.personNameError = new Component(this.elem, "div", ["name-error"], "");
    this.personPhoneNumber = new InputComponent(this.elem, "text", ["person-input", "person-phone"], "Phone number");
    this.personPhoneNumberError = new Component(this.elem, "div", ["phone-error"], "");
    this.personDeliveryAddress = new InputComponent(this.elem, "text", ["person-input", "person-address"], "Delivery address");
    this.personDeliveryAddressError = new Component(this.elem, "div", ["address-error"], "");
    this.personMail = new InputComponent(this.elem, "text", ["person-input", "person-mail"], "E-mail");
    this.personMailError = new Component(this.elem, "div", ["mail-error"], "");
  
    this.personPhoneNumber.elem.oninput = () => this.onPersonPhoneNumberInput();
    this.personName.elem.onchange = () => this.onPersonNameChange();
    this.personPhoneNumber.elem.onchange = () => this.onPersonPhoneNumberChange();
    this.personDeliveryAddress.elem.onchange = () => this.onPersonDeliveryAddressChange();
    this.personMail.elem.onchange = () => this.onPersonMailChange();
  }
  
  onPersonNameChange = () => {
    if (!(/.{3,} .{3,}/.test(this.personName.elem.value) && this.personName.elem.value.trim() !== "")) {
      this.personNameError.elem.textContent = "Person name - error";
    } else {
      this.personNameError.elem.textContent = "";
    }
  }
  
  onPersonPhoneNumberChange = () => {
    if (!(/\+\d{9,}/.test(this.personPhoneNumber.elem.value) && this.personPhoneNumber.elem.value.trim() !== "")) {
      this.personPhoneNumberError.elem.textContent = "Phone number - error";
    } else {
      this.personPhoneNumberError.elem.textContent = "";
    }
  }
  
  onPersonDeliveryAddressChange = () => {
    if (!/.{5,} .{5,} .{5,}/.test(this.personDeliveryAddress.elem.value) || this.personDeliveryAddress.elem.value === "") {
      this.personDeliveryAddressError.elem.textContent = "Delivery address - error";
    } else {
      this.personDeliveryAddressError.elem.textContent = "";
    }
  }

  onPersonMailChange = () => {
    if (!(MAIL_REGEXP.test(this.personMail.elem.value) && this.personMail.elem.value.trim() !== "")) {
      this.personMailError.elem.textContent = "Person mail - error";
    } else {
    this.personMailError.elem.textContent = "";
    }
  }
  
  onPersonPhoneNumberInput = () => {
    if (this.personPhoneNumber.elem.value.length === 1 && this.personPhoneNumber.elem.value !== "+") {
      this.personPhoneNumber.elem.value = `+${this.personPhoneNumber.elem.value}`;
    }
  }

}
