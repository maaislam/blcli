/**
 * @desc Mobile basket
 */

import settings from '../../settings';
import { pollerLite } from '../../../../../../../lib/uc-lib';

const { ID } = settings;

export default class MobileBasket {
  constructor() {
    this.create();
    this.bindEvents();
    this.render();
  }

  create() {
    const element = document.createElement('div');
    element.classList.add(`${ID}_mobileBasket`);

    /* create the fixed pop up basket */
    element.innerHTML = `
    <div class="${ID}-basket_title">
      <h3>Basket Summary</h3>
    </div>
    <div class="${ID}-basket_items">
      <p>You are adding this logo to these items:</p>
    </div>`;

    // Move the basket items inside the new component
    pollerLite(['#customisation_right'], () => {
      const basketItems = document.querySelector('#customisation_right');
      basketItems.removeAttribute('style');
      element.querySelector(`.${ID}-basket_items`).appendChild(basketItems);

      // loop through all existing basket items and put in new wrapper
      const newItemWrapper = document.createElement('div');
      newItemWrapper.classList.add(`${ID}-items`);
      basketItems.insertAdjacentElement('afterbegin', newItemWrapper);

      const allItems = element.querySelectorAll('#customisation_right .item');
      for (let index = 0; index < allItems.length; index += 1) {
        const basketItem = allItems[index];
        element.querySelector(`.${ID}-items`).appendChild(basketItem);
      }
    });

    this.component = element;
  }

  bindEvents() {
    const { component } = this;
    const title = component.querySelector(`.${ID}-basket_title`);
    title.addEventListener('click', () => {
      if (component.classList.contains(`${ID}-basket_visible`)) {
        component.classList.remove(`${ID}-basket_visible`);
        title.querySelector('h3').textContent = 'Basket Summary';
        document.body.classList.remove(`${ID}-no_scroll`);
      } else {
        component.classList.add(`${ID}-basket_visible`);
        title.querySelector('h3').textContent = 'You are customising...';
        document.body.classList.add(`${ID}-no_scroll`);
      }
    });
  }

  render() {
    const { component } = this;
    document.body.appendChild(component);
  }
}
