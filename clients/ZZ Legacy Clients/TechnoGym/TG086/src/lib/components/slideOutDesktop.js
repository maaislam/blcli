import settings from '../settings';
const { ID } = settings;

export default class slideOutFiltersDesktop {
  constructor() {
    this.create();
    this.bindEvents();
    this.render();
  }

  create() {
    const element = document.createElement('div');
    element.classList.add(`${ID}_slideOutFilters`);
    element.innerHTML = `
    <div class="${ID}-closeFilters"></div>
      <div class="${ID}-filtersInner_content">
        <h3>All filters</h3>
        <div class="${ID}-allFilters"></div>
        </div>
      </div>
    `;
    this.component = element;

    const allFilters = document.querySelector('.block.block-layered-nav.amshopby-filters-left');
    element.querySelector(`.${ID}-allFilters`).appendChild(allFilters);
  
    const overlay = document.createElement('div');
    overlay.classList.add(`${ID}-overlay`);
    document.body.appendChild(overlay);

    const clearAll = document.createElement('div');
    clearAll.classList.add(`${ID}-clearAll`);
    clearAll.innerHTML = `Clear All`;
    element.querySelector('.block-subtitle').appendChild(clearAll);
  }

  bindEvents() {
    const { component } = this;
    const overlayWrap = document.querySelector(`.${ID}-overlay`);
    
    const filterButton = document.querySelector(`.${ID}-topFiltersWrapper .${ID}-seeMore`);
    filterButton.addEventListener('click', () => {
      component.classList.add(`${ID}-filterShow`);
      overlayWrap.classList.add(`${ID}-overlay-show`);
    });

    component.querySelector(`.${ID}-closeFilters`).addEventListener('click', () => {
      component.classList.remove(`${ID}-filterShow`);
      overlayWrap.classList.remove(`${ID}-overlay-show`);
    });

    overlayWrap.addEventListener('click', () => {
      component.classList.remove(`${ID}-filterShow`);
      overlayWrap.classList.remove(`${ID}-overlay-show`);
    });

    const clearFilter = component.querySelector(`.${ID}-clearAll`);
    clearFilter.addEventListener('click', () => {
        document.querySelector('.actions .clear-all').click();
    });
  }

  render() {
    const { component } = this;
    document.body.appendChild(component);
  }
}
