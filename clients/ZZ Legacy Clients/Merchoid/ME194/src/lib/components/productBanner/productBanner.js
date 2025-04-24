import settings from '../../settings';

const { ID } = settings;

export default class ProductBanner {
  constructor() {
    this.create();
    this.bindEvents();
    this.render();
  }

  create() {
    const element = document.createElement('div');
    element.classList.add(`${ID}_product_banner`);
    element.innerHTML =
    `<div class="${ID}-banner_text">
      <h3></h3>
      <p> We only stock limited quantities of products. These products usually sell out and won’t be available again</p>
    </div>
    `;
    this.component = element;
  }

  bindEvents() {
    const { component } = this;
  }

  render() {
    const { component } = this;
    const thirdRowProduct = document.querySelector('.products .product-small:nth-child(6)');
    thirdRowProduct.insertAdjacentElement('afterEnd', component);
  }
}
