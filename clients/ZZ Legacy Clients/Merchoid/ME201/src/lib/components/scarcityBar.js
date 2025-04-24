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
    <p class="${ID}-pulseText"></p>`
    this.component = element;

    const stockMessage = 'Hurry! Last Few Available';

    element.querySelector('p').textContent = "Checking Stock";
    element.querySelector('p').classList.add(`${ID}-pulseText`);
 
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
    const productGallery = document.querySelector('.gallery-placeholder');
    productGallery.insertAdjacentElement('beforebegin', component);
  }
}
