/* Last viewed products markup */

import settings from '../settings';
import { __ } from '../helpers';

const { ID } = settings;

export default class AllLastProducts {
  constructor() {
    const productDataStr = window.localStorage.TG089recommended_prods_1;
    if (productDataStr) {
      this.productData = JSON.parse(productDataStr);
      if (this.productData.length) {
        this.createAndRender();
      }
    }
  }

  createAndRender() {
    const lastViewedproducts = document.createElement('div');
    lastViewedproducts.classList.add(`${ID}-lastViewed_Products`);
    lastViewedproducts.innerHTML = `
    <div class="${ID}_LastViewedProducts-list_wrapper">
      <span>${__('Your Recently Viewed Gym Equipment')}</span>
      <ul class="${ID}_LastViewedProducts-list">
        ${this.productData.map(data => `
          <li class="${ID}_LastViewedProducts-item">
            <a href="${data.link}">
              <div class="${ID}_LastViewedProducts-img" style="background-image:url(${data.image})"></div>
              <p class="${ID}_LastViewedProducts-name">${data.name}</p>
              <a class="${ID}_productLink" href="${data.link}">Discover More</a>
            </a>
          </li>
        `).join('')}
      </ul>
    </div>`;
    document.querySelector('.category-view').insertAdjacentElement('afterbegin', lastViewedproducts);
  }
}
