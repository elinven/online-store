//import { ProductCart } from "../../types/index";
import { Card } from "../card/card";
import Component from "../component";
import { Person, MAIL_REGEXP } from "../person/person";
import { getStorageItem } from "../utils/loader";
import "./purchase.css";

export class PurchaseModal extends Component {
  public person: Person;
  public card: Card;
  public confirmButton;
  public confirmMessage;
  
  constructor(parentNode: HTMLElement) {
    super(parentNode, "div", ["purchase-modal"]);

    this.person = new Person(this.elem);
    this.card = new Card(this.elem);
    this.confirmButton = new Component(this.elem, "button", ["confirm-button"], "CONFIRM");
    this.confirmMessage = new Component(this.elem, "div", ["confirm-message"], "");

    this.confirmButton.elem.onclick = () => this.onConfirmButtonClick();
  }

  onConfirmButtonClick = () => {
    const isPersonName = /.{3,} .{3,}/.test(this.person.personName.elem.value) && this.person.personName.elem.value.trim() !== "";
    if (!isPersonName) {
      this.person.personNameError.elem.textContent = "Person name - error";
    } else {
      this.person.personNameError.elem.textContent = "";
    }

    const isPersonPhoneNumber = /\+\d{9,}/.test(this.person.personPhoneNumber.elem.value) && this.person.personPhoneNumber.elem.value.trim() !== "";
    if (!isPersonPhoneNumber) {
      this.person.personPhoneNumberError.elem.textContent = "Phone number - error";
    } else {
      this.person.personPhoneNumberError.elem.textContent = "";
    }

    const isPersonDeliveryAddress = /.{5,} .{5,} .{5,}/.test(this.person.personDeliveryAddress.elem.value) && this.person.personDeliveryAddress.elem.value.trim() !== "";
    if (!isPersonDeliveryAddress) {
      this.person.personDeliveryAddressError.elem.textContent = "Delivery address - error";
    } else {
      this.person.personDeliveryAddressError.elem.textContent = "";
    }

    const isPersonMail = MAIL_REGEXP.test(this.person.personMail.elem.value) && this.person.personMail.elem.value.trim() !== "";
    if (!isPersonMail) {
      this.person.personMailError.elem.textContent = "Person mail - error";
    } else {
      this.person.personMailError.elem.textContent = "";
    }

    const isCardNumber = /\d{4} \d{4} \d{4} \d{4}/.test(this.card.cardNumber.elem.value) && this.card.cardNumber.elem.value.trim() !== "";
    if (!isCardNumber) {
      this.card.cardNumberError.elem.textContent = "Card number - error";
    } else {
      this.card.cardNumberError.elem.textContent = "";
    }

    const isCardValidThru = /[0-1][0-2]\/\d{2}/.test(this.card.cardValidThru.elem.value) && this.card.cardValidThru.elem.value.trim() !== "";
    if (!isCardValidThru) {
      this.card.cardValidThruError.elem.textContent = "Card valid thru - error";
    } else {
      this.card.cardValidThruError.elem.textContent = "";
    }

    const isCardCVV = /\d{3}/.test(this.card.cardCVVCode.elem.value) && this.card.cardCVVCode.elem.value.trim() !== "";
    if (!isCardCVV) {
      this.card.cardCVVError.elem.textContent = "Card CVV - error";
    } else {
      this.card.cardCVVError.elem.textContent = "";
    }

    if (isPersonName && isPersonPhoneNumber && isPersonDeliveryAddress && isPersonMail && isCardNumber && isCardValidThru && isCardCVV) {
      setTimeout(() => {
        // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
        document.querySelector('.cart-summa')!.textContent = '0.00';
        // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
        document.querySelector('.cart-amount')!.textContent = '0';
        localStorage.setItem('cart', JSON.stringify({amount: 0, summa: 0, goods: []}));
        this.elem.classList.remove('open');
        document.body.classList.remove('scroll-lock');
        window.location.hash = `#/${getStorageItem('hash')}`;
        location.reload();
      }, 5000);
      this.confirmMessage.elem.textContent = "Confirm sucssesfully!";
    } else {
      this.confirmMessage.elem.textContent = "";
    }
  }

}