/*
 * Hardcoded level 1 filter categories
 */

import settings from '../../lib/settings';
import dropdownHelper from './priceChanges/dropdownHelper';
import applyPrice from './priceChanges/applyPrice';
import metalType from './innerFilterTypeChanges/metalType';
import stoneShape from './innerFilterTypeChanges/stoneShape';

const { ID } = settings;

export default class FilterLevel1 {
  constructor(options) {
    this.filterData = options.filters;
    this.create();
    this.bindEvents();
    this.render();
  }

  create() {
    const element = document.createElement('div');
    element.classList.add(`${ID}_filterLevel1`);

    element.innerHTML = `
    ${Array.prototype.map.call(this.filterData, (filterData, i) => {
      return document.querySelector(filterData.accordianTarget) ? `
      <div class="${ID}_filterLvl1-filter" filter-attr="${filterData.accordianTarget}" name-attr="${filterData.name}">
        <p>${filterData.title}</p>
      </div>
    ` : ``}).join('')}`;

    this.component = element;
  }

  bindEvents() {
    const { component } = this;
    // on click of top level, add class to matching attr to make it slide out.

    const newFilter = component.querySelectorAll(`.${ID}_filterLvl1-filter`);

    // on click of the individual new categories
    for (let index = 0; index < newFilter.length; index += 1) {
      const element = newFilter[index];
      element.addEventListener('click', (e) => {
        // Show & hide the filters
        const allFilters = document.querySelectorAll('#filter-modal .filters-panel__refinement-section');
        // remove any that are already active
        for (let i = 0; i < allFilters.length; i += 1) {
          const item = allFilters[i];
          if (item.classList.contains(`${ID}-filter_active`)) {
            item.classList.remove(`${ID}-filter_active`);
          }
        }

        const elTarget = e.currentTarget.getAttribute('filter-attr');
        // Make one active
        const matchingElm = document.querySelector(`#filter-modal ${elTarget} div:last-child`);
        matchingElm.classList.add(`${ID}-filter_active`);

        const heading = matchingElm.querySelector('h3');
        if (heading) {
          heading.textContent = e.currentTarget.querySelector('p').textContent;

          sessionStorage.setItem(`${ID}-filtered`, e.currentTarget.getAttribute('name-attr'));

          // on click of active back button remove active class
          document.querySelector(`.${ID}-filter_active .${ID}-filter_close`).addEventListener('click', () => {
            if (document.querySelector(`.${ID}-filter_active`)) {
              document.querySelector(`.${ID}-filter_active`).classList.remove(`${ID}-filter_active`);
            }
            sessionStorage.removeItem(`${ID}-filtered`);
          });

          document.querySelector(`.${ID}-filter_active .${ID}-filter_close`);

          // run the price helpers if refinement is clicked due to rebuild of filters
          if (elTarget === '#refinement-price') {
            dropdownHelper();
            applyPrice();
          }

          // change the material types if it is clicked
          if (elTarget === '#refinement-material') {
            metalType();
          }
          if (elTarget === '#refinement-stone-shape') {
            stoneShape();
          }
        }
      });
    }
  }

  render() {
    const { component } = this;
    const filterCategoryWrap = document.querySelector(`.${ID}-filterCategories`);
    filterCategoryWrap.appendChild(component);
  }
}
