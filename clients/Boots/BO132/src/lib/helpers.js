import shared from '../../../../../core-files/shared';
import { fireEvent } from '../../../../../core-files/services';
import getData from './getData';
import expData from './expData';

const { ID, VARIATION } = shared;

export const filterTitle = () => {
  let filterName;

  let pageData;
  if (window.location.pathname.indexOf(`/fragrance/fragrance-offers`) > -1) {
    pageData = expData[`/fragrance/fragrance-offers`];
  } else if (window.location.pathname.indexOf(`searchTerm`) > -1) {
    pageData = expData[`searchTerm`];
  } else {
    pageData = expData[`${window.location.pathname}`];
  }


  if(VARIATION === '1') {
    filterName = pageData[`${VARIATION}`].filterName;
  }
  if(VARIATION === '2') {
    filterName = pageData[`${VARIATION}`].filterName;
  }

  return filterName;
}

export const createFilterWrapper = () => {
  const heroFilter = document.createElement('div');
  heroFilter.classList.add(`${ID}-heroFilters`);
  heroFilter.innerHTML = `
  <h3>Filter by ${filterTitle()}</h3>
  <div class="${ID}-filters">

  </div>`;

  if (!document.querySelector(`.${ID}-heroFilters`)) {
    document.querySelector('#estores_product_listing_widget').insertAdjacentElement('afterbegin', heroFilter);
  }
  
}

export const addFilters = () => {
  const allFilters = getData();

  Object.keys(allFilters).forEach((i) => {
    const data = allFilters[i];
    const filter = document.createElement('div');
    filter.classList.add(`${ID}-filterBox`);
    filter.setAttribute('filter-target', data.target);
    filter.innerHTML = `<span>${data.name}</span>`;
    // console.log(filter);
    // console.log('- - - - - -');
    document.querySelector(`.${ID}-filters`).appendChild(filter);
  }); 
}

export const checkActive = () => {
  const filters = document.querySelectorAll(`.${ID}-filterBox`);
  for (let index = 0; index < filters.length; index += 1) {
    const element = filters[index];
    
    const filterTargets = element.getAttribute('filter-target').trim();
    if (document.querySelector(`.row.facetContainer a[id^="${filterTargets.replace(/'/g, "\\'").replace(/\?/g, "\\?").replace(/&/g, "\\&") }"`)) {
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
}

export const filterClick = () => {
  const filters = document.querySelectorAll(`.${ID}-filterBox`);
  const url = window.location.pathname;
  for (let index = 0; index < filters.length; index += 1) {
    const element = filters[index];
    element.addEventListener('click', (e) => {
      const targetEl = e.currentTarget.getAttribute('filter-target');
      const filterName = e.currentTarget.querySelector('span');
      document.querySelector(`.row.facetContainer a[id^="${targetEl.replace(/'/g, "\\'").replace(/\?/g, "\\?").replace(/&/g, "\\&") }"`).click();

      if(filterName) {
        fireEvent(`Clicked - Hero Filter - ${filterName.textContent} - ${url}`);
        // window.cmCreateManualLinkClickTag(`/BO132?cm_sp=BO132${VARIATION}Maxymiser-_-BO132${VARIATION}ClickedHeroFilter-${filterName.textContent}-_-${url}`);
      }
    });
    
  }
}

export const slickFilters = () => {
  if (!document.querySelector(`.${ID}-heroFilters.${ID}-filterByPromotion`)) {
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
  } else if (document.querySelector(`.${ID}-heroFilters.${ID}-filterByPromotion`)) {
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
              slidesToShow: 2,
              slidesToScroll: 1,
              dots:false,
            }
          },
          {
            breakpoint: 1024,
            settings: {
              slidesToShow: 2,
              slidesToScroll: 2,
              dots:false,
            }
          }
        ]
    });
  }
    
}