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
    <p class="${ID}-pulseText">Checking Stock</p>`;
    this.component = element;

    let stockMessage;

    if (settings.VARIATION === '1') {
      stockMessage = 'Last Few Remaining';
    } else if (settings.VARIATION === '2') {
      stockMessage = 'Less Than 3 Available';
    } else if (settings.VARIATION === '3') {
      stockMessage = 'Less than 5% of Stock Remaining';
    }

    setTimeout(() => {
      element.querySelector('p').classList.remove(`${ID}-pulseText`);
      element.querySelector('p').textContent = stockMessage;
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
