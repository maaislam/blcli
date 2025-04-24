/* eslint-disable no-underscore-dangle */
import settings from './../settings';
import { pollerLite } from '../../../../../lib/uc-lib';
import { cacheDom } from '../../../../../lib/cache-dom';

/** Class that renders a USPBox */
export default class USPBox {
  /** Run triggers */
  run() {
    pollerLite(['.product-image'], () => {
      this._create();
      this._render();
    });
  }

  /** Create component element */
  _create() {
    const component = document.createElement('div');
    component.classList.add(`${settings.ID}_USPBox`);

    const list = document.createElement('ul');
    list.classList.add(`${settings.ID}_USPBox__list`);
    component.appendChild(list);

    /**
     * Appends a USP to container
     * @param {String} text The text to go in the USP
     */
    const createUSP = (text) => {
      const listItem = document.createElement('li');
      listItem.classList.add(`${settings.ID}_USPBox__list__item`);
      listItem.innerHTML = `<p>${text}</p>`;
      list.appendChild(listItem);
    };

    /** In Stock USP */
    const stockLevel = cacheDom.get('.stock-level__item.stockLevel.inStock');
    if (stockLevel) {
      createUSP('In Stock');
    }

    /** Free Delivery USP */
    try {
      const price = window.digitalData.product[0].price.currentPrice;
      if (price) {
        if (price >= 100) {
          createUSP('Free UK Delivery on this product');
        } else {
          createUSP('Free UK Delivery over £100');
        }
      }
    } catch (e) { } // eslint-disable-line

    /** Free Returns USP */
    createUSP('Free UK Returns');


    this.component = component;
  }

  /** Render component elements */
  _render() {
    const buyButtons = cacheDom.get('.buying-buttons');
    buyButtons.parentElement.insertBefore(this.component, buyButtons.nextSibling);
  }
}
