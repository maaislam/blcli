
/* Create the size content */
import settings from '../../settings';
import { pollerLite } from '../../../../../../../lib/uc-lib';


const { ID } = settings;

export default class SizeContent {
  constructor() {
    this.create();
    this.bindEvents();
    this.render();
  }

  create() {
    const productPrice = document.querySelector('.price.large .woocommerce-Price-amount.amount');
    const element = document.createElement('div');
    element.classList.add(`${ID}_stickyInner`);

    element.innerHTML = `
      <h4>Please select your size</h4>
      <span class="${ID}-sizeError">Please select a size</span>
      <div class="${ID}-sizeGuide_wrapper"></div>
      <div class="${ID}-size-options"></div>
      <div class="${ID}-product_price">${productPrice.textContent}</div>
      <div class="${ID}-addToCartSize">Add to cart</div>
    `;

    this.component = element;

    pollerLite(['.size-guide-wrapper'], () => {
      const sizeGuide = document.querySelector('.size-guide-wrapper');
      element.querySelector(`.${ID}-sizeGuide_wrapper`).appendChild(sizeGuide);
    });
  }

  bindEvents() {
    const { component } = this;
  }

  render() {
    const { component } = this;
    const sizeWrapper = document.querySelector(`.${ID}-sizeBox`);
    sizeWrapper.appendChild(component);
  }
}

