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
    element.classList.add(`${ID}-animatedLoader`);

    element.innerHTML = `
    <div class="${ID}-smallerLoader"></div>
    <p class="${ID}-pulseText">Checking stock...</p>`
    this.component = element;

    const stockMessage = 'Hurry! Last Few Available <br> Add to basket to secure yours now';
    

    element.querySelector('p').classList.remove(`${ID}-pulseText`);

    setTimeout(() => {
      // element.querySelector('p').textContent = "Checking Stock";
      element.querySelector('p').classList.add(`${ID}-pulseText`);
    }, 2000);

    setTimeout(() => {
      element.querySelector('p').classList.remove(`${ID}-pulseText`);
      element.querySelector('p').innerHTML = stockMessage;
    }, 5000);
  }

  bindEvents() {
    const { component } = this;
  }

  render() {
    const { component } = this;
    const productGallery = document.querySelector('.product-gallery .product-gallery-slider');
    productGallery.insertAdjacentElement('beforebegin', component);
  }
}
