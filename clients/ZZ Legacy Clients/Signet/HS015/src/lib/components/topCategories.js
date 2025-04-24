import settings from '../../lib/settings';
import categories from '../components/catObjects';
import { events } from '../../../../../../lib/utils';

const { ID } = settings;

export default class TopCategories {
  constructor() {
    this.create();
    this.bindEvents();
    this.render();
    this.addContent();
  }

  create() {
    const pageTitle = document.querySelector('.page-title').textContent.trim().replace('Shop','');

    const element = document.createElement('div');
    element.classList.add(`${ID}_topCategories`);

    element.innerHTML = `
      <h3>Shop by Category</h3>
      <div class="${ID}-innerCategories">
        <div class="${ID}-catBoxes"></div>
      </div>`;
    this.component = element;
  }

  bindEvents() {
    const { component } = this;
  }

  render() {
    const { component } = this;
    // const productsWrapper = document.querySelector('.browse__sort-container.mobile-and-tablet-only');
    const productsWrapper = document.querySelector('.browse__results-and-sort-container');
    productsWrapper.insertAdjacentElement('afterend', component);
  }

  addContent() {
    const { component } = this;

    const catObj = categories;
    // add categories to the new element
    const URL = window.location.pathname;
    const allKeys = Object.keys(catObj);

    for (let index = 0; index < allKeys.length; index += 1) {
      const element = allKeys[index];

      const data = catObj[element];
      const catKey = [element][0];
      
      if (URL.indexOf(catKey) > -1) {
        const matchingCat = data[0];
        // loop through the matching data
        Object.keys(matchingCat).forEach((j) => {
          const matchData = matchingCat[j];
          const categoryEl = document.createElement('div');
          categoryEl.classList.add(`${settings.ID}-category`);
          categoryEl.innerHTML = `
          <a href="${matchData.link}">
            <span class="${settings.ID}-catImage" style="background-image:url(${matchData.image})"></span>
            <p>${[j][0]}</p>
          </a>`;

          component.querySelector(`.${settings.ID}-catBoxes`).appendChild(categoryEl);

          categoryEl.addEventListener('click', () => {
            events.send(`${ID} v${settings.VARIATION}`, 'click', 'Top filter category clicked');
          });
        });

        break;
      }
    }
  }
}

