import Component from "../component";
import InputComponent from "../inputcomponent";
import "./card.css";

const PAYMENT_SYSTEMS = [
  ['4', 'https://cdn.visa.com/v2/assets/images/logos/visa/blue/logo.png'],
  ['5', 'https://www.mastercard.hu/content/dam/public/mastercardcom/eu/hu/images/mc-logo-52.svg'],
  ['6', 'https://m.unionpayintl.com/imp_file/global/wap/en/static/images/logo.png']
];

export class Card extends Component {
  public cardTitle;
  public cardContent;
  public cardData;
  public cardLogo;
  public cardLogoImg;
  public cardNumber;
  public cardValidData;
  public cardValid;
  public cardValidText;
  public cardValidThru;
  public cardCVV;
  public cardCVVText;
  public cardCVVCode;
  public cardNumberError;
  public cardValidThruError;
  public cardCVVError;

  constructor(parentNode: HTMLElement) {
    super(parentNode, "div", ["card-container"]);

    this.cardTitle = new Component(this.elem, "div", ["card-title"], "Credit card detail");
    this.cardContent = new Component(this.elem, "div", ["card"]);
    this.cardData = new Component(this.cardContent.elem, "div", ["card-data"]);
    this.cardLogo = new Component(this.cardData.elem, "div", ["card-logo"]);
    this.cardLogoImg = new Component(this.cardLogo.elem, "img", ["card-img"]);
    this.cardNumber = new InputComponent(this.cardData.elem, "text", ["app-input", "card-number"], "Card number", "[0-9]{4} [0-9]{4} [0-9]{4} [0-9]{4}");
    this.cardValidData = new Component(this.cardContent.elem, "div", ["valid-data"]);
    this.cardValid = new Component(this.cardValidData.elem, "div", ["card-valid"]);
    this.cardValidText = new Component(this.cardValid.elem, "div", ["valid-text"], "VALID");
    this.cardValidThru = new InputComponent(this.cardValid.elem, "text", ["app-input", "card-data"], "Valid Thru", "[0-1]{1}[1-2]{1}/[0-9]{2}");
    this.cardCVV = new Component(this.cardValidData.elem, "div", ["card-cvv"]);
    this.cardCVVText = new Component(this.cardCVV.elem, "div", ["cvv-text"], "CVV");
    this.cardCVVCode = new InputComponent(this.cardCVV.elem, "text", ["app-input", "card-code"], "Code", "^[0-9]{3}$");
    this.cardNumberError = new Component(this.elem, "div", ["card-error"], "");
    this.cardValidThruError = new Component(this.elem, "div", ["valid-error"], "");
    this.cardCVVError = new Component(this.elem, "div", ["cvv-error"], "");

    this.cardLogoImg.elem.setAttribute("src", "../../assets/img/no-logo.webp");

    this.cardNumber.elem.oninput = () => this.onCardNumberInput();
    this.cardValidThru.elem.oninput = () => this.onCardValidThruInput();
    this.cardCVVCode.elem.oninput = () => this.cardCVVCode.elem.value = this.cardCVVCode.elem.value.substring(0, 3);
    this.cardNumber.elem.onchange = () => this.onCardNumberChange();
    this.cardValidThru.elem.onchange = () => this.onCardValidThruChange();
    this.cardCVVCode.elem.onchange = () => this.onCardCVVChange();
  }

  onCardNumberChange = () => {
    if (!/\d{4} \d{4} \d{4} \d{4}/.test(this.cardNumber.elem.value)) {
      this.cardNumberError.elem.textContent = "Card number - error";
    } else {
      this.cardNumberError.elem.textContent = "";
    }
  }

  onCardValidThruChange = () => {
    if (!/[0-1][0-2]\/\d{2}/.test(this.cardValidThru.elem.value)) {
      this.cardValidThruError.elem.textContent = "Card valid thru - error";
    } else {
      this.cardValidThruError.elem.textContent = "";
    }
  }

  onCardCVVChange = () => {
    if (!/\d{3}/.test(this.cardCVVCode.elem.value)) {
      this.cardCVVError.elem.textContent = "Card CVV - error";
    } else {
      this.cardCVVError.elem.textContent = "";
    }
  }

  /*isCardValidThru = () => {
    return /[0-1][0-2]\/\d{2}/.test(<string>this.elem.getAttribute("value"));
  }

  isCardCVV = () => {
    return /\d{3}/.test(<string>this.elem.getAttribute("value"));
  }*/

  onCardNumberInput = () => {
    const lengthValues = [4, 9, 14];
    if (this.cardNumber.elem.value.length === 0) {
      this.cardLogoImg.elem.setAttribute("src", "../../assets/img/no-logo.webp");
    }
    if (this.cardNumber.elem.value.length === 1) {
      const paymentSystemData = PAYMENT_SYSTEMS.find((e) => e[0] === this.cardNumber.elem.value.substring(0, 1));
      console.log(paymentSystemData);
      if (paymentSystemData) {
        this.cardLogoImg.elem.setAttribute("src", paymentSystemData[1]);
      } else {
        this.cardLogoImg.elem.setAttribute("src", "../../assets/img/no-logo.webp");
      }
    } 

    if (lengthValues.includes(this.cardNumber.elem.value.length)) {
      this.cardNumber.elem.value = this.cardNumber.elem.value + ' ';
    }
    this.cardNumber.elem.value = this.cardNumber.elem.value.substring(0, 19);
  }

  onCardValidThruInput = () => {
    if (this.cardValidThru.elem.value.length === 2) {
      this.cardValidThru.elem.value = this.cardValidThru.elem.value.substring(0, 2) + '/';
    }
    if (this.cardValidThru.elem.value.length > 5) {
      this.cardValidThru.elem.value = this.cardValidThru.elem.value.substring(0, 5);
    }
  }

 }

