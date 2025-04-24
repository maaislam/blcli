import settings from '../../lib/settings';

const { ID } = settings;

export default class LimitedBanner {
  constructor() {
    this.create();
    this.bindEvents();
    this.render();
  }

  create() {
    const element = document.createElement('div');
    element.classList.add(`${ID}_badgeContainer`);


    element.innerHTML =
    `<div class="${ID}-innerBadge"></div>
    `;

    this.component = element;
  }

  bindEvents() {
    const { component } = this;
  }

  render() {
    const { component } = this;
    const productImages = document.querySelector('.product-gallery .product-image');
    productImages.insertAdjacentElement('afterbegin', component);
  }
}
