import settings from '../../lib/settings';
import { events } from '../../../../../../lib/utils';

const { ID, VARIATION } = settings;

export default class CartPreview {
  /**
   * @param {object} options
   * @param {function} options.render Function to render component
   */
  constructor(options) {
    const opts = options || {};
    this.cartProducts = Array.from(document.querySelectorAll('.skin-metahd-item-cart .product-row')).splice(0, 6);
    this.cartLength = window.digitalData.cart.item.length;
    this.accountName = (() => {
      const nameEl = document.querySelector('.label-name');
      return nameEl ? nameEl.getAttribute('title') : undefined;
    })();
    this.create();
    this.bindEvents();
    if (opts.render) opts.render(this.component);
  }

  create() {
    const countryCode = document.querySelector('html').getAttribute('lang').toUpperCase();
    const element = document.createElement('div');
    switch (countryCode) {
      case 'EN':
        element.innerHTML = `
          <div class="container">
            <div class="${ID}_CartPreview row">
              <div class="col-4">
                <div class="${ID}_CartPreview__title">${this.accountName ? `Hi ${this.accountName}, you have items in your cart...` : 'You have items in your cart...'}</div>
              </div>
              <div class="col-5">
                <ul class="${ID}_CartPreview__items">
                  ${this.cartProducts.map(node => `
                    <li>
                      <div class="${ID}_CartPreview__item__img">
                        <img src="${node.querySelector('.product-image').src}" />
                      </div>
                    </li>
                  `).join('')}
                </ul>
              </div>
              <div class="col-3">
                <div class="${ID}_CartPreview__CTA">
                  <a href="/cart/checkout">
                    Checkout now
                    <span class="${ID}_CartPreview__CTA__count pulse">
                      <span class="${ID}_CartPreview__CTA__count__num">${this.cartLength}</span>
                    </span>
                  </a>
                </div>
              </div>
            </div>
          </div>
        `;
        break;
      case 'DE':
        element.innerHTML = `
          <div class="container">
            <div class="${ID}_CartPreview row">
              <div class="col-4">
                <div class="${ID}_CartPreview__title">${this.accountName ? `${this.accountName}, In Ihrem Einkaufswagen...` : 'In Ihrem Einkaufswagen...'}</div>
              </div>
              <div class="col-5">
                <ul class="${ID}_CartPreview__items">
                  ${this.cartProducts.map(node => `
                    <li>
                      <div class="${ID}_CartPreview__item__img">
                        <img src="${node.querySelector('.product-image').src}" />
                      </div>
                    </li>
                  `).join('')}
                </ul>
              </div>
              <div class="col-3">
                <div class="${ID}_CartPreview__CTA">
                  <a href="/cart/checkout">
                    Zur Kasse
                    <span class="${ID}_CartPreview__CTA__count pulse">
                      <span class="${ID}_CartPreview__CTA__count__num">${this.cartLength}</span>
                    </span>
                  </a>
                </div>
              </div>
            </div>
          </div>
        `;
        break;
      case 'CH':
        element.innerHTML = `
          <div class="container">
            <div class="${ID}_CartPreview row">
              <div class="col-4">
                <div class="${ID}_CartPreview__title">${this.accountName ? `${this.accountName}, In Ihrem Einkaufswagen...` : 'In Ihrem Einkaufswagen...'}</div>
              </div>
              <div class="col-5">
                <ul class="${ID}_CartPreview__items">
                  ${this.cartProducts.map(node => `
                    <li>
                      <div class="${ID}_CartPreview__item__img">
                        <img src="${node.querySelector('.product-image').src}" />
                      </div>
                    </li>
                  `).join('')}
                </ul>
              </div>
              <div class="col-3">
                <div class="${ID}_CartPreview__CTA">
                  <a href="/cart/checkout">
                    Zur Kasse
                    <span class="${ID}_CartPreview__CTA__count pulse">
                      <span class="${ID}_CartPreview__CTA__count__num">${this.cartLength}</span>
                    </span>
                  </a>
                </div>
              </div>
            </div>
          </div>
        `;
        break;
      case 'FR':
        element.innerHTML = `
          <div class="container">
            <div class="${ID}_CartPreview row">
              <div class="col-4">
                <div class="${ID}_CartPreview__title">${this.accountName ? `${this.accountName}, vous avez des articles dans votre panier...` : 'Vous avez des articles dans votre panier...'}</div>
              </div>
              <div class="col-5">
                <ul class="${ID}_CartPreview__items">
                  ${this.cartProducts.map(node => `
                    <li>
                      <div class="${ID}_CartPreview__item__img">
                        <img src="${node.querySelector('.product-image').src}" />
                      </div>
                    </li>
                  `).join('')}
                </ul>
              </div>
              <div class="col-3">
                <div class="${ID}_CartPreview__CTA">
                  <a href="/cart/checkout">
                    Payer maintenant
                    <span class="${ID}_CartPreview__CTA__count pulse">
                      <span class="${ID}_CartPreview__CTA__count__num">${this.cartLength}</span>
                    </span>
                  </a>
                </div>
              </div>
            </div>
          </div>
        `;
        break;
      case 'SV':
        element.innerHTML = `
          <div class="container">
            <div class="${ID}_CartPreview row">
              <div class="col-4">
                <div class="${ID}_CartPreview__title">${this.accountName ? `${this.accountName}, du har varor i din kundvagn...` : 'Du har varor i din kundvagn...'}</div>
              </div>
              <div class="col-5">
                <ul class="${ID}_CartPreview__items">
                  ${this.cartProducts.map(node => `
                    <li>
                      <div class="${ID}_CartPreview__item__img">
                        <img src="${node.querySelector('.product-image').src}" />
                      </div>
                    </li>
                  `).join('')}
                </ul>
              </div>
              <div class="col-3">
                <div class="${ID}_CartPreview__CTA">
                  <a href="/cart/checkout">
                    Gå till kassan nu
                    <span class="${ID}_CartPreview__CTA__count pulse">
                      <span class="${ID}_CartPreview__CTA__count__num">${this.cartLength}</span>
                    </span>
                  </a>
                </div>
              </div>
            </div>
          </div>
        `;
        break;
      default:
        break;
    }

    this.component = element;
  }

  bindEvents() {
    const goToCart = this.component.querySelector(`.${ID}_CartPreview__CTA`);
    goToCart.addEventListener('click', () => {
      events.send(ID, 'User clicked', `checkout-now - Variation ${VARIATION}`);
    });
  }
}
