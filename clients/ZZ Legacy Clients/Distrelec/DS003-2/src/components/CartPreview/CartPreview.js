import settings from '../../lib/settings';

const { ID } = settings;

export default class Search {
  constructor() {
    this.cartProducts = Array.from(document.querySelectorAll('.skin-metahd-item-cart .product-row')).splice(0, 6);
    this.accountName = (() => {
      const nameEl = document.querySelector('.label-name');
      return nameEl ? nameEl.getAttribute('title') : undefined;
    })();
    if (this.cartProducts.length) {
      this.create();
    } else {
      return {
        component: '',
      };
    }
  }

  create() {
    const element = document.createElement('div');

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
                <span class="${ID}_CartPreview__CTA__count">
                  <span class="${ID}_CartPreview__CTA__count__num">${this.cartProducts.length}</span>
                </span>
              </a>
            </div>
          </div>
        </div>
      </div>
    `;

    this.component = element;
  }
}
