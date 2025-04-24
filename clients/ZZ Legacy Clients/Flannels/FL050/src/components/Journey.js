import settings from '../lib/settings';
import { events } from '../../../../../lib/utils';

const { ID } = settings;

export default class Journey {
  constructor(opts) {
    const options = opts || {};
    this.brand = options.brand;
    this.brandLink = options.brandLink;
    this.categoryLink = options.categoryLink || '';
    this.categoryName = options.categoryName || '';
    this.create();
    this.bindEvents();
    this.render();
  }

  create() {
    const newCategoryName = this.categoryName.toLowerCase();
    const element = document.createElement('div');
    element.classList.add(`${ID}_journeyWrap`);
    element.innerHTML = `
      <div class="${ID}_journey">
        <h3 class="${ID}_journey__title">Keep shopping</h3>
        <div class="${ID}_journey__buttonWrap">
          <a href="/${this.brandLink}" class="${ID}_journey__button forward"><strong>Shop Brand:</strong> <span>${this.brand}</span></a>
        </div>
        ${this.categoryLink && this.categoryName !== '' ? `
          <div class="${ID}_journey__buttonWrap ${newCategoryName.indexOf(this.brand) > -1  ? 'same' : ''}">
            <a href="${this.categoryLink}" class="${ID}_journey__button back">Back to ${this.categoryName}</a>
          </div>
        ` : ''}
      </div>
    `;
    this.component = element;
  }

  bindEvents() {
    this.component.querySelector('.forward').addEventListener('click', () => {
      events.send(ID, 'User clicked', 'shop-brand');
    });
    if(this.component.querySelector('.back')){
      this.component.querySelector('.back').addEventListener('click', () => {
        events.send(ID, 'User clicked', 'back-to-category');
      });
    }
  }

  render() {
    document.querySelector('#divBagItems').insertAdjacentElement('beforeend', this.component);
  }
}
