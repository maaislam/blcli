import settings from '../../lib/settings';

const { ID } = settings;

export default class ScarcityBar {
  constructor() {
    this.create();
    this.bindEvents();
    this.render();
  }

  create() {
    const element = document.createElement('div');
    element.classList.add(`${ID}_scarcityBar`);

    element.innerHTML = `
    <div class="${ID}-smallerLoader"></div>
    <p class="${ID}-pulseText">Checking Stock</p>`;
    this.component = element;

    setTimeout(() => {
      element.querySelector('p').classList.remove(`${ID}-pulseText`);
      element.querySelector('p').textContent = '500 items available!';
    }, 5000);

    setTimeout(() => {
      element.querySelector('p').textContent = 'Hurry! Last Few Available';
    }, 10000);
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
