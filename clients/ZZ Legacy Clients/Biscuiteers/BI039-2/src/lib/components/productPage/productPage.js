/* Create the slide out delivery tab */

import settings from '../../settings';

const { ID } = settings;

export default class ProductPageLayout {
  constructor() {
    this.create();
    this.bindEvents();
    this.render();
  }

  create() {
    const element = document.createElement('div');
    element.classList.add(`${ID}-ctaButtons`);

    element.innerHTML = `
    <div class="${ID}-button ${ID}-buyButton" tab-target="${ID}-buyNow">
      <span>buy now</span>
    </div>
    <span class="${ID}-or">or</span>
    <div class="${ID}-button ${ID}-delivery" tab-target="${ID}-deliveryTab">
      <span>check delivery</span>
    </div>
    `;

    this.component = element;
  }

  bindEvents() {
    const { component } = this;
  }

  render() {
    const { component } = this;
    const addToBag = document.querySelector('local-add-to-basket');
    addToBag.insertAdjacentElement('beforebegin', component);

    // move price
    let price;
    if (document.querySelector('.w-8.w-12-m.w-12-s.m-t-6-m.m-t-6-s price')) {
      price = document.querySelector('.w-8.w-12-m.w-12-s.m-t-6-m.m-t-6-s price');
    } else {
      price = document.querySelector('.p-l-2-x.p-l-2-l price');
    }
    const productImage = document.querySelector('.w-8.w-12-m.w-12-s.m-t-6-m.m-t-6-s .pos-relative');
    if (productImage) {
      productImage.insertAdjacentElement('afterend', price);
    }

    // move the reminder service below tabs
    const pressieReminder = document.querySelector('local-product-view ng-include');
    const tabs = document.querySelector('local-product-view .pos-relative.p-l-2-s.p-r-2-s');
    tabs.insertAdjacentElement('afterend', pressieReminder);
  }
}
