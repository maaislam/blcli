/* Create the slide out delivery tab */

import settings from '../../settings';
import { addPoller } from '../../winstack';
import upsellProducts from '../upsellProducts/upsellProducts';
import { poller } from '../../../../../../../lib/uc-lib';

const { ID } = settings;

export default class BuySlide {
  constructor() {
    this.create();
    this.bindEvents();
    this.render();
  }

  create() {
    const productName = document.querySelector('.w-12.flex h1').textContent;

    const element = document.createElement('div');
    element.id = `${ID}-buyNow`;
    element.classList.add(`${ID}_buyNowTab`);
    element.classList.add(`${ID}_SlideTab`);

    // change this so it fits in with the buy now
    element.innerHTML = `
    <div class="${ID}-slideTitle">
      <span class="${ID}-slideClose"></span>
      <div class="${ID}-AddedToBag_content">
        <p><span>${productName}</span> was added to your bag</p>
      </div>
    </div>
    <div class="${ID}-upsell_content"></div>
    <div class="${ID}-button"><a href="/basket"  onclick="window.location = '/basket'"><span>Continue to basket</span></a></div>
    <div class="${ID}-smallLink">
      <a href="/biscuits" onclick="window.location = '/biscuits'">Continue shopping</a>
    </div>`;

    this.component = element;

    // add the upsell items to the component
    poller([
      'upsell-products', 
      'upsell-products-item', 
      'upsell-products-item input[type=checkbox][value]',
      'upsell-products-item img',
      'upsell-products-item [ng-bind*="name"]',
      'upsell-products-item .price-value',
      '.BI039-2-upsell_content',
    ], () => {
      upsellProducts();
    }, {
      multiplier: 1,
    });
  }

  bindEvents() {
    const { component } = this;
  }

  render() {
    const { component } = this;
    document.body.appendChild(component);
  }
}
