import settings from '../../settings';

const { ID } = settings;
const isMobile = window.ACC.config.uiExperienceLevel === 'Mobile';

export default class PricePerSqm {
  constructor() {
    this.pricePerSqm = PricePerSqm.getPricePerSqm();
    this.create();
    this.render();
  }

  create() {
    const { pricePerSqm } = this;

    const component = document.createElement('div');
    component.classList.add(`${ID}_PricePerSqm`);

    component.innerHTML = `
      <div class="${ID}_table">
        <div class="${ID}_data">
          <div class="${ID}_head">Pack Coverage</div>
          <div class="${ID}_body">${PricePerSqm.getPackCoverage()} m²</div>
        </div>

        <div class="${ID}_data">
          <div class="${ID}_head">Price per m²</div>
          <div class="${ID}_body">
            <span class="${ID}_pricePerSqmVal">${pricePerSqm}<small>*</small></span>
          </div>
        </div>
      </div>
      <div class="${ID}_smallText">* approximation (ex VAT)</div>
    `;

    this.component = component;
  }

  render() {
    const { component } = this;

    if (isMobile) {
      document.querySelector('.tp_prodPrice').insertAdjacentElement('afterend', component);
    } else {
      document.querySelector('.productPrice').insertAdjacentElement('afterend', component);
    }
  }

  /**
   * Get the price per square metre
   * @returns {string}
   */
  static getPricePerSqm() {
    const pricePerSqm = PricePerSqm.getPriceExVat() / PricePerSqm.getPackCoverage();
    return `£${pricePerSqm.toFixed(2).replace('.00', '')}`;
  }

  /**
   * Get the product price (ex VAT)
   * @returns {Number}
   */
  static getPriceExVat() {
    return Number(document.querySelector('.product_price_section .price_value').innerText.replace(/[$£€]/g, ''));
  }

  /**
   * Get the coverage of the pack in metres squared
   * @returns {Number}
   */
  static getPackCoverage() {
    const coverageInTechSpecsLabel = [].filter.call(document.querySelectorAll('.attrib'), (el) => {
      const name = el.innerText.trim().toLowerCase();
      return name === 'coverage' || name === 'pack coverage';
    });

    const coverageText = coverageInTechSpecsLabel[0].nextElementSibling.innerText.trim();
    return Number(coverageText.match(/[\d.]+/)[0]);
  }
}
