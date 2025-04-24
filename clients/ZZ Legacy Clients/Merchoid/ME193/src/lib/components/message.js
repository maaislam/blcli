import settings from '../../lib/settings';

const { ID } = settings;

export default class ScarcityMessage {
  constructor() {
    this.create();
    this.bindEvents();
    this.render();
  }

  create() {
    const element = document.createElement('div');
    element.classList.add(`${ID}_scarcityMessage`);

    element.innerHTML = `<p class="${ID}-pulseText">Checking Stock…</p>`;
    this.component = element;

    setTimeout(() => {
      element.querySelector('p').classList.remove(`${ID}-pulseText`);
      element.querySelector('p').textContent = 'Hurry! Very Limited Stock Available';
    }, 2000);
  }

  bindEvents() {
    const { component } = this;
  }

  render() {
    const { component } = this;
    const productGallery = document.querySelector('.product-gallery .product-gallery-slider');
    productGallery.insertAdjacentElement('afterBegin', component);
  }
}
