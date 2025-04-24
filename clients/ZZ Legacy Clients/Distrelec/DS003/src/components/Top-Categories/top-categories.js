import settings from '../../lib/settings';
import { categories, categoriesMap, defaultProducts } from '../data/data';
import { events } from '../../../../../../lib/utils';
import { generateName } from '../../lib/services';
const { ID, VARIATION } = settings;

export default class TopCategories {
  /**
   * @param {object} options
   * @param {function} options.render Function to render component
   */
  constructor(options) {
    const opts = options || {};
    this.create();
    this.bindEvents();
    if (opts.render) opts.render(this.component);
  }

  create() {
    let title;
    let showMore;
    let hide;
    let nameTransl;
    const strings = {
      titleGB: 'Top categories for you',
      titleDE: 'Ihre Top-Kategorien',
      titleFR: 'Les meilleures catégories sélectionnées pour vous',
      titleSE: 'Populära kategorier för dig',
      buttonShowGB: 'Show more categories',
      buttonShowDE: 'Mehr Kategorien anzeigen',
      buttonShowFR: 'Afficher plus de catégories',
      buttonShowSE: 'Visa fler kategorier',
      buttonHideGB: 'Show fewer categories',
      buttonHideDE: 'Mehr Kategorien ausblenden',
      buttonHideFR: 'Afficher moins de catégories',
      buttonHideSE: 'Visa färre kategorier',
    };
    const countryCode = document.querySelector('html').getAttribute('lang').toUpperCase();
    const element = document.createElement('div');
    const area = JSON.parse(localStorage.getItem('DS003'));
    let subCategories;
    element.classList.add(`${ID}_topCategories`);
    switch (countryCode) {
      case 'EN':
        title = `<h3 class="${ID}_topCategories__title">${strings.titleGB}</h2>`;
        showMore = `<div class="${ID}_topCategories__button showMore"><label for="catCollapse">${strings.buttonShowGB}</label></div>`;
        hide = `<div class="${ID}_topCategories__button showLess"><label for="catCollapse">${strings.buttonHideGB}</label></div>`;
        nameTransl = 'EN';
        break;
      case 'DE':
        title = `<h3 class="${ID}_topCategories__title">${strings.titleDE}</h2>`;
        showMore = `<div class="${ID}_topCategories__button showMore"><label for="catCollapse">${strings.buttonShowDE}</label></div>`;
        hide = `<div class="${ID}_topCategories__button showLess"><label for="catCollapse">${strings.buttonHideDE}</label></div>`;
        nameTransl = 'DE';
        break;
      case 'CH':
        title = `<h3 class="${ID}_topCategories__title">${strings.titleDE}</h2>`;
        showMore = `<div class="${ID}_topCategories__button showMore"><label for="catCollapse">${strings.buttonShowDE}</label></div>`;
        hide = `<div class="${ID}_topCategories__button showLess"><label for="catCollapse">${strings.buttonHideDE}</label></div>`;
        nameTransl = 'CH';
        break;
      case 'FR':
        title = `<h3 class="${ID}_topCategories__title">${strings.titleFR}</h2>`;
        showMore = `<div class="${ID}_topCategories__button showMore"><label for="catCollapse">${strings.buttonShowFR}</label></div>`;
        hide = `<div class="${ID}_topCategories__button showLess"><label for="catCollapse">${strings.buttonHideFR}</label></div>`;
        nameTransl = 'FR';
        break;
      case 'SV':
        title = `<h3 class="${ID}_topCategories__title">${strings.titleSE}</h2>`;
        showMore = `<div class="${ID}_topCategories__button showMore"><label for="catCollapse">${strings.buttonShowSE}</label></div>`;
        hide = `<div class="${ID}_topCategories__button showLess"><label for="catCollapse">${strings.buttonHideSE}</label></div>`;
        nameTransl = 'SV';
        break;
      default:
        break;
    }
    let html = `
      <div class="${ID}_topCategoriesWrap">
        ${title}
        <input type="checkbox" id="catCollapse" name="catCollapse">
        <div class="${ID}_topCategories__content">
    `;
    if(area){
      const areaLabel = area.areaofuse || '(Other) Research';
      subCategories = categoriesMap[areaLabel];
      for (let i = 0; i < 18; i += 1) {
        html += `
            <div class="${ID}_topCategories__itemWrap">
              <a href="${subCategories[i].link}" class="${ID}_topCategories__item">
                <img class="${ID}_topCategories__img" src="${subCategories[i].image}">
                ${generateName(nameTransl, subCategories[i])}
              </a>
            </div>
          `;
      }
    } else {
      subCategories = categoriesMap['(Other) Research'];
      for (let i = 0; i < 18; i += 1) {
        html += `
            <div class="${ID}_topCategories__itemWrap">
              <a href="${subCategories[i].link}" class="${ID}_topCategories__item">
                <img class="${ID}_topCategories__img" src="${subCategories[i].image}">
                ${generateName(nameTransl, subCategories[i])}
              </a>
            </div>
          `;
      }
    }
    html += `
        <div class="${ID}_topCategories__buttonWrap">
            ${showMore}
            ${hide}
        </div>
      </div>
    </div>
    `;
    element.innerHTML = html;
    this.component = element;
  }

  bindEvents() {
    const topCategories = this.component.querySelectorAll(`.${ID}_topCategories__item`);
    Array.from(topCategories).forEach((category) => {
      const categoryName = category.querySelector(`.${ID}_topCategories__itemTitle`).textContent;
      category.addEventListener('click', () => {
        events.send(ID, 'User clicked', `${categoryName} - Variation ${VARIATION}`);
      });
    });
  }
}
