import settings from '../../lib/settings';
import { pollerLite, poller } from '../../../../../../lib/uc-lib';

const { ID } = settings;

export default class HomeMarkup {
  constructor(options) {
    this.bannerData = options.banners;
    this.create();
    this.bindEvents();
    this.render();
  }

  create() {
    const element = document.createElement('div');
    element.classList.add(`${ID}_HomeBanner_wrapper`);
    element.innerHTML = `
    <div class="${ID}-grid">

    ${Array.prototype.map.call(this.bannerData, (bannerData, i) => `
    <a class="${ID}-column" href="${bannerData.link}">
      <p class="${ID}-title">${bannerData.title}</p>   
        <div class="${ID}-column_text">
          <p>${bannerData.innerText}</p>
          <span class="${ID}-button button">Shop Now</span>
        </div>
        <div class="${ID}-banner_image">
          <div class="${ID}_image" style="background-image: url(${bannerData.img})"></div>
        </div>
    </a>
    `).join('')}
    </div>`;

    this.component = element;
  }

  bindEvents() {
    const { component } = this;
  }

  render() {
    const { component } = this;
    const deliveryBanner = document.querySelector('#access-content .delivery-banner');
    deliveryBanner.insertAdjacentElement('afterend', component);
  }
}
