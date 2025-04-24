/**
 * ID - Description
 *
 * @fileoverview The main experiment logic goes here. Everything should be written inside the
 * activate function which is called if the conditions in triggers.js have passed evaluation
 * @author User Conversion
 */
import getData from './getData';
import priceSlider from './priceSlider';
import { setup } from './services';
import shared from './shared';

export default () => {
  setup();



  const { ID, VARIATION } = shared;

  const filterTitle = () => {
    let filterName;
    if(VARIATION === '1') {
      filterName = 'brand';
    }
    if(VARIATION === '2' || VARIATION === '3') {
      filterName = 'price';
    }
    if(VARIATION === '4') {
      filterName = 'rating';
    }

    return filterName;
  }

  const filterTracking = () => {
    const allFilters = document.querySelectorAll('#productsFacets .facetSelect .facetbutton');
    const url = window.location.pathname;
    for (let index = 0; index < allFilters.length; index += 1) {
      const element = allFilters[index];
      element.addEventListener('click', (e) => {
        const filterName = e.currentTarget.getAttribute('name');
        if(filterName) {
          window.cmCreateManualLinkClickTag(`/BO062?cm_sp=BO062${VARIATION}Maxymiser-_-BO062${VARIATION}ClickedFilter-${filterName}-_-${url}`);
        }
      });
    }
  }

  const createFilterWrapper = () => {
    const heroFilter = document.createElement('div');
    heroFilter.classList.add(`${ID}-heroFilters`);
    heroFilter.innerHTML = `
    <h3>Filter by ${filterTitle()}</h3>
    <div class="${ID}-filters">

    </div>`;

    document.querySelector('#estores_product_listing_widget').insertAdjacentElement('afterbegin', heroFilter);
  }

  const addFilters = () => {
    const allFilters = getData();

    Object.keys(allFilters).forEach((i) => {
      const data = allFilters[i];
      const filter = document.createElement('div');
      filter.classList.add(`${ID}-filterBox`);
      filter.setAttribute('filter-target', data.target);
      filter.innerHTML = `<span>${data.name}</span>`;
      document.querySelector(`.${ID}-filters`).appendChild(filter);
    }); 
  }

  const checkActive = () => {
    const filters = document.querySelectorAll(`.${ID}-filterBox`);
    for (let index = 0; index < filters.length; index += 1) {
      const element = filters[index];
      
      const filterTargets = element.getAttribute('filter-target');
      const matchingFilter = document.querySelector(`.row.facetContainer a[id^="${filterTargets.replace(/'/g, "\\'").replace(/\?/g, "\\?").replace(/&/g, "\\&") }"`);
      
      if(matchingFilter) {

        if(matchingFilter.getAttribute('aria-checked') === 'true') {
          element.classList.add(`${ID}-filterActive`);
        } else {
          element.classList.remove(`${ID}-filterActive`);
        }
      }
    }
  }

  const filterClick = () => {
    const filters = document.querySelectorAll(`.${ID}-filterBox`);
    const url = window.location.pathname;
    for (let index = 0; index < filters.length; index += 1) {
      const element = filters[index];
      element.addEventListener('click', (e) => {
        const targetEl = e.currentTarget.getAttribute('filter-target');
        const filterName = e.currentTarget.querySelector('span');
        document.querySelector(`.row.facetContainer a[id^="${targetEl.replace(/'/g, "\\'").replace(/\?/g, "\\?").replace(/&/g, "\\&") }"`).click();

        if(filterName) {
          window.cmCreateManualLinkClickTag(`/BO062?cm_sp=BO062${VARIATION}Maxymiser-_-BO062${VARIATION}ClickedHeroFilter-${filterName.textContent}-_-${url}`);
        }
      });
      
    }
  }

  const slickFilters = () => {
      window.jQuery(`.${ID}-filters`).slick({
        slidesToShow: 3,
        slidesToScroll: 3,
        draggable: true,
        rows: 0,
        infinite: true,
        nextArrow: `<button class="slide-arrow ${ID}-next"></button>`,
        prevArrow: `<button class="slide-arrow ${ID}-back"></button>`,
        responsive: [
          {
            breakpoint: 9999,
            settings: {
              slidesToShow: 4,
              slidesToScroll: 3,
              dots:false,
            }
          },
          {
            breakpoint: 1024,
            settings: {
              slidesToShow: 3,
              slidesToScroll: 3,
              dots:false,
            }
          }
        ]
    });
  }



  if(VARIATION == '1' || VARIATION === '3' || VARIATION === '4') {
    createFilterWrapper();
    addFilters();
    filterClick();
    checkActive();
    filterTracking();

    if(window.innerWidth > 767) {
      if(getData().length > 2) {
        slickFilters();
        window.jQuery(`.${ID}-filters`).slick('resize');
      }
    }
  }

  if(VARIATION === '2') {
    if(window.location.href.indexOf('&minPrice:0&maxPrice') === -1) {
      createFilterWrapper();
      filterTracking();
      priceSlider().loadScript();
      const slider = document.querySelector(`.${ID}-filters`);
      if(slider && !slider.noUiSlider) {
        priceSlider().init();
      }
    }
    
  }
};
