import settings from '../../lib/settings';

const { ID } = settings;

export default class Loader {
  constructor() {
    this.create();
    this.bindEvents();
    this.render();
  }

  create() {
    const element = document.createElement('div');
    element.classList.add(`${ID}_loader`);
    element.innerHTML = `<div class="${ID}-loader_inner">
    <div class="${ID}-preloader">
      <div class="${ID}-circle"></div>
    </div>
    <span>Loading...</span>
    </div>`;
    this.component = element;
  }

  bindEvents() {
    const { component } = this;
    setTimeout(() => {
      component.classList.add(`${ID}-loader_hide`);
    }, 3000);
  }

  render() {
    const { component } = this;
    document.body.classList.add(`${ID}-loader_hidden`);
    document.querySelector('.large-6.columns.product-gallery').append(component);
  }
}
