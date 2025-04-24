import settings from '../../lib/settings';
import { categories, categoriesMap } from '../data/data';

const { ID } = settings;

export default class TopCategories {
  constructor() {
    this.create();
    this.bindEvents();
  }

  create() {
    const element = document.createElement('div');
    element.classList.add(`${ID}_topCategories`);
    let html = `
      <div class="${ID}_topCategoriesWrap">
        <h3 class="${ID}_topCategories__title">Top categories for you</h2>
        <input type="checkbox" id="catCollapse" name="catCollapse">
        <div class="${ID}_topCategories__content">
    `;
    const area = JSON.parse(localStorage.getItem('DS003'));
    const areaLabel = area.areaofuse;
    const subCategories = categoriesMap[areaLabel];
    for (let i = 0; i < 18; i += 1) {
      html += `
          <div class="${ID}_topCategories__itemWrap">
            <a href="#" class="${ID}_topCategories__item">
              <img class="${ID}_topCategories__img" src="https://dxlfb468n8ekd.cloudfront.net/gsc/U20SQ6/d4/30/29/d43029f476744456ad15b0c140082e4e/images/acb_logged_out/u12.png?token=66bd44ecbc9e227e9639f5dee2efe6fb">
              <h4 class="${ID}_topCategories__itemTitle">${subCategories[i]}</h4>
            </a>
          </div>
        `;
    }
    html += `
        <div class="${ID}_topCategories__buttonWrap">
            <div class="${ID}_topCategories__button"><label for="catCollapse"></label></div>
        </div>
      </div>
    </div>
    `;
    element.innerHTML = html;
    this.component = element;
  }

  bindEvents() {
  };
}
