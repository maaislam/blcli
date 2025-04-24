import settings from '../settings';

const { ID } = settings;

export default class PaymentButtons {
  constructor() {
    this.create();
    this.bindEvents();
    this.render();
  }

  create() {
    const paypalButton = document.querySelector('.paypal.checkout');

    const element = document.createElement('div');
    element.classList.add(`${ID}_paymentButtons`);
    element.innerHTML = `
      <div class="${ID}-button ${ID}-cardButton">Pay with card</div>
      ${paypalButton ? `<div class="${ID}-button ${ID}-paypalButton">Pay with <span></span></div>` : ''}
    `;
    this.component = element;
  }

  bindEvents() {
    const { component } = this;

    const paypalButton = document.querySelector('.paypal.checkout input');
    const cardButton = document.querySelector('.action.primary.checkout');

    component.querySelector(`.${ID}-cardButton`).addEventListener('click', () => {
      cardButton.click();
    });

    if (paypalButton) {
      component.querySelector(`.${ID}-paypalButton`).addEventListener('click', () => {
        paypalButton.click();
      });
    }
  }

  render() {
    const { component } = this;
    const paymentButtons = document.querySelector('.checkout.methods.items');
    if (paymentButtons) {
      paymentButtons.insertAdjacentElement('afterbegin', component);
    }
  }
}
