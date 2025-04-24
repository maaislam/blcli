import shared from '../shared';
import { __ } from '../helpers';

const { ID } = shared;

export default class BasketHeader {
  constructor() {
    this.create();
    this.bindEvents();
    this.render();
  }

  create() {
    const element = document.createElement('div');
    element.classList.add(`${ID}_basket-header`);
    element.innerHTML = `
     <div class="${ID}-topBar">
        <div class="${ID}-logo">
            <img src="https://www.technogym.com/skin/frontend/technogym/default/images/technogym.png" alt="Technogym">
        </div>
        <div class="${ID}-contact">
            <h3>Need help? Call us ${__('0800 316 2496')}</h3>
        </div>
     </div>
     <div class="${ID}-basket_head">
      <div class="${ID}-continue_desktop ${ID}-text_link"><a href="/">${__('Continue Shopping')}</a></div>
        <div class="${ID}-basket-steps">
            <div class="${ID}-step">
                <span>1</span>
                <p>${__('My Basket')}</p>
            </div>
            <div class="${ID}-step">
                <span>2</span>
                <p>${__('Checkout')}</p>
            </div>
            <div class="${ID}-step">
                <span>3</span>
                <p>${__('Payment')}</p>
            </div>
        </div>
        <div class="${ID}-checkout_desktop ${ID}-text_link"><a href="/${__('gb')}/onestepcheckout">${__('Proceed to checkout')}</a></div>
     </div>`;
    this.component = element;
  }

  bindEvents() {
    const { component } = this;
  }

  render() {
    const { component } = this;
    document.querySelector('.header-container').insertAdjacentElement('afterend', component);

    // change the continue link to checkout on desktop
    const desktopSize = (window.innerWidth > 1023);
    
    const continueButton = component.querySelector(`.${ID}-checkout_desktop`);
    if(desktopSize) {
      continueButton.querySelector('a').textContent = `${__('Proceed to checkout')}`;
      continueButton.querySelector('a').setAttribute('href', `/${__('gb')}/onestepcheckout`);
    } else {
      continueButton.querySelector('a').textContent = `${__('Continue Shopping')}`;
      continueButton.querySelector('a').setAttribute('href', '/');
    }
  }
}

