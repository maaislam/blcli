import settings from '../../settings';
import { pollerLite } from '../../../../../../../lib/uc-lib';

const { ID } = settings;

export default class StickyCTA {
  constructor() {
    this.create();
    this.bindEvents();
    this.render();
  }

  create() {
    const productName = document.querySelector('.mobile-target-product-title');
    const productPrice = document.querySelector('.price.large .woocommerce-Price-amount.amount');

    const wasPrice = document.querySelector('.price.large del .woocommerce-Price-amount.amount');
    const nowPrice = document.querySelector('.price.large ins .woocommerce-Price-amount.amount');
    const element = document.createElement('div');
    element.classList.add(`${ID}_stickyCTA`);

    /* Hide all secondary slides by default to prevent "flicker" as
    flickity slider loads in */
    element.innerHTML = `
      <div class="${ID}_stickyContent">
      <div class="${ID}-productInfo">
        <h2>${productName.textContent}</h2>
        ${wasPrice ? `<p class="${ID}-wasPrice">${wasPrice.textContent}</p><p class="${ID}-product_price">${nowPrice.textContent}</p>` : `<p class="${ID}-product_price">${productPrice.textContent}</p>`}
        <div class="${ID}-addToCart">Add to cart</div>
      </div>
      </div>
      <div class="${ID}-sizeBox"></div>
    `;

    this.component = element;

    // insert the offical banner and the usps
    pollerLite(['.product-title-region-after', '.product-usps'], () => {
      const officialMerchandiseBanner = document.querySelector('.product-title-region-after');
      element.querySelector(`.${ID}-productInfo`).insertAdjacentElement('afterbegin', officialMerchandiseBanner);

      const productUSPs = document.querySelector('.product-usps');
      element.querySelector(`.${ID}-addToCart`).insertAdjacentElement('afterend', productUSPs);
    });
  }

  bindEvents() {
    const { component } = this;
  }

  render() {
    const { component } = this;
    document.body.appendChild(component);

    if (document.querySelectorAll('.variations #pa_size option')) {
      const overlayPage = document.createElement('div');
      overlayPage.classList.add(`${ID}-overlay`);
      document.body.appendChild(overlayPage);

      const sizeBox = document.querySelector(`.${ID}-sizeBox`);
      const stickyContent = document.querySelector(`.${ID}_stickyContent`);
      // close everything on overlay click
      overlayPage.addEventListener('click', () => {
        sizeBox.classList.remove(`${ID}-sizeBox_active`);
        stickyContent.classList.remove(`${ID}-content_hide`);
        overlayPage.classList.remove(`${ID}-overlay_active`);
      });
    }
  }
}

