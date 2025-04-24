import settings from '../../lib/settings';

const { ID } = settings;

export default class BrandSlider {
  constructor() {
    this.scrapeData();
    this.create();
    this.bindEvents();
    this.render();
  }

  scrapeData() {
    const oldSliderBrands = document.querySelectorAll('.logo-slider-container .gallery-cell');
    const brands = Array.prototype.map.call(oldSliderBrands, brand => brand.innerHTML);
    this.brandsMarkup = brands;
  }

  create() {
    const element = document.createElement('div');
    element.classList.add(`${ID}_BrandSlider`);
    element.innerHTML = `
      <h1>View merch from your favourite brands</h1>
      <div class="${ID}_BrandSlider-slider">
        ${this.brandsMarkup.map(markup => `
          <div class="${ID}_BrandSlider-brand">
            ${markup}
          </div>
        `).join('')}
      </div>
    `;
    this.component = element;
  }

  bindEvents() {
    const { component } = this;
  }

  render() {
    const { component } = this;
    const heroBanner = document.querySelector(`.${ID}_HeroBanner`);
    heroBanner.insertAdjacentElement('afterend', component);
  }
}
