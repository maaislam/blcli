import settings from '../../lib/settings';
import { events } from '../../../../../../lib/utils';

const { ID } = settings;

export default class PLPReview {
  constructor(product) {
    this.product = product;
    this.create();
    this.bindEvents();
    this.render();
  }

  create() {
    const element = document.createElement('div');
    element.classList.add(`${ID}_star-review__buttonWrap`);
    const link = this.product.querySelector('.ga-product-click').href;
    element.innerHTML = `
      <a href="${link}" class="${ID}_star-review__button"><img src="https://dd6zx4ibq538k.cloudfront.net/static/images/4068/68d70a4431447f3a51bdb2e50566040f_1980_333.png">Expert Star Review</a>
    `;
    this.component = element;
  }

  bindEvents() {
    this.component.addEventListener('click', () => {
      events.send(ID, 'Clicked', 'Star Review PLP');
    });
  }

  render() {
    this.product.querySelector('.productCard_mediaContainer').insertAdjacentElement('afterend', this.component);
  }
}
