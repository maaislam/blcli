import settings from '../../lib/settings';
import { feedbackTab } from '../../../../../../lib/uc-lib';

const { ID } = settings;

export default class LastViewedProducts {
  constructor() {
    const productDataStr = window.localStorage.recommended_prods_1 || window.localStorage.recommended_prods_2;
    if (productDataStr) {
      this.productData = JSON.parse(productDataStr);
      if (this.productData.length) {
        this.createAndRender();
      }
    }
  }

  createAndRender() {
    const markup = `
    <div class="${ID}_LastViewedProducts-list_wrapper">
      <ul class="${ID}_LastViewedProducts-list">
        ${this.productData.map(data => `
          <li class="${ID}_LastViewedProducts-item">
            <a href="${data.link}">
              <div class="${ID}_LastViewedProducts-img"><img src="${data.image}" /></div>
              <p class="${ID}_LastViewedProducts-name">${data.name}</p>
              <p class="${ID}_LastViewedProducts-price">${data.price}</p>
            </a>
          </li>
        `).join('')}
      </ul>
    </div>
    `;

    feedbackTab.init({
      label: 'Pick up where you left off',
      content: markup,
      position: 'bottom',
      tabDimensions: { width: '100%', height: 'auto' },
      contentDimensions: { width: '100%', height: '350px' },
      dimBackground: true,
      customClass: `${ID}_LastViewedProducts`,
      animationSpeed: 300,
      sessionClose: true,
    });
  }
}
