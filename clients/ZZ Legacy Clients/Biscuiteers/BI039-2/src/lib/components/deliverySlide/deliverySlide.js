/* Create the slide out delivery tab */

import settings from '../../settings';
import { addObserver, addPoller } from '../../winstack';

const { ID } = settings;

export default class DeliverySlide {
  constructor(options) {
    this.deliveryPoints = options.points;
    this.create();
    this.bindEvents();
    this.render();
  }

  create() {
    const element = document.createElement('div');
    element.id = `${ID}-deliveryTab`;
    element.classList.add(`${ID}_deliveryTab`);
    element.classList.add(`${ID}_SlideTab`);

    element.innerHTML = `
    <div class="${ID}-slideTitle">
      <span class="${ID}-slideClose"></span>
      <h3>Delivery Info</h3>
    </div>
    <div class="${ID}-tabContent">
    <div class="${ID}-delivery_content">
      <p>delivered worldwide, 7 days a week!</p>
      <p class="${ID}-international_text">order before 1pm for next day delivery</p>
      <ul>
      ${Array.prototype.map.call(this.deliveryPoints, (deliveryPoints, i) => `
        <li>${deliveryPoints.text}</li>
        `).join('')}
      </ul>
      </div>
      <p class="${ID}-international_text">For more options see our <a href="/delivery">delivery page</a></p>
      <p class="${ID}-boxText">securely packed, with at least 1 month’s shelf life. write a gift card at the checkout.</p>
      <div class="${ID}-occasion_content"></div>
      <div class="${ID}-personalised_message"><label></label><input placeholder="type your message (26 characters)" class="input" type="text"/></div>
      <div class="${ID}-buyButton ${ID}-button ${ID}-deliveryBuybutton">buy now</div>
    </div>
    `;

    this.component = element;
  }

  bindEvents() {
    const { component } = this;
  }

  render() {
    const { component } = this;
    document.body.appendChild(component);
  }
}
