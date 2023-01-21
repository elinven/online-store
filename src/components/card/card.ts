import Component from "../component";
import InputComponent from "../inputcomponent";
import onInputChange from "../utils/input-change";
import "./card.css";

const PAYMENT_SYSTEMS = [
  ['4', 'https://cdn.visa.com/v2/assets/images/logos/visa/blue/logo.png'],
  ['5', 'https://www.mastercard.hu/content/dam/public/mastercardcom/eu/hu/images/mc-logo-52.svg'],
  ['6', 'https://m.unionpayintl.com/imp_file/global/wap/en/static/images/logo.png']
];

const NO_LOGO = "https://i.guim.co.uk/img/media/b73cc57cb1d46ae742efd06b6c58805e8600d482/16_0_2443_1466/master/2443.jpg?width=700&quality=85&auto=format&fit=max&s=fb1dca6cdd4589cd9ef2fc941935de71";

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
    this.cardNumber = new InputComponent(this.cardData.elem, "text", ["app-input", "card-number"], "Card number");
    this.cardValidData = new Component(this.cardContent.elem, "div", ["valid-data"]);
    this.cardValid = new Component(this.cardValidData.elem, "div", ["card-valid"]);
    this.cardValidText = new Component(this.cardValid.elem, "div", ["valid-text"], "VALID");
    this.cardValidThru = new InputComponent(this.cardValid.elem, "text", ["app-input", "card-data"], "Valid Thru");
    this.cardCVV = new Component(this.cardValidData.elem, "div", ["card-cvv"]);
    this.cardCVVText = new Component(this.cardCVV.elem, "div", ["cvv-text"], "CVV");
    this.cardCVVCode = new InputComponent(this.cardCVV.elem, "text", ["app-input", "card-code"], "Code");
    this.cardNumberError = new Component(this.elem, "div", ["card-error"], "");
    this.cardValidThruError = new Component(this.elem, "div", ["valid-error"], "");
    this.cardCVVError = new Component(this.elem, "div", ["cvv-error"], "");

    this.cardLogoImg.elem.setAttribute("src", NO_LOGO);

    this.cardNumber.elem.oninput = () => this.onCardNumberInput();
    this.cardValidThru.elem.oninput = () => this.onCardValidThruInput();
    this.cardCVVCode.elem.oninput = () => this.cardCVVCode.elem.value = this.cardCVVCode.elem.value.substring(0, 3);
    this.cardNumber.elem.onchange = () => onInputChange(/[0-9]{4} [0-9]{4} [0-9]{4} [0-9]{4}/, this.cardNumber, this.cardNumberError, "Card number - error");
    this.cardValidThru.elem.onchange = () => onInputChange(/[0-1][0-2]\/\d{2}/, this.cardValidThru, this.cardValidThruError, "Card valid thru - error");
    this.cardCVVCode.elem.onchange = () => onInputChange(/\d{3}/, this.cardCVVCode, this.cardCVVError, "Card CVV - error");
  }

  onCardNumberInput = () => {
    const lengthValues = [4, 9, 14];
    if (this.cardNumber.elem.value.length === 0) {
      this.cardLogoImg.elem.setAttribute("src", NO_LOGO);
    }
    if (this.cardNumber.elem.value.length === 1) {
      const paymentSystemData = PAYMENT_SYSTEMS.find((e) => e[0] === this.cardNumber.elem.value.substring(0, 1));
      if (paymentSystemData) {
        this.cardLogoImg.elem.setAttribute("src", paymentSystemData[1]);
      } else {
        this.cardLogoImg.elem.setAttribute("src", NO_LOGO);
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