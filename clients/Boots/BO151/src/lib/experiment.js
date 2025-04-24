/**
 * ID - Description
 *
 * @fileoverview The main experiment logic goes here. Everything should be written inside the
 * activate function which is called if the conditions in triggers.js have passed evaluation
 * @author User Conversion
 */

import { setup, fireEvent } from '../../../../../core-files/services';
import shared from '../../../../../core-files/shared';
import { addPriceFilters, addReviewFilters, brandFilters } from './filterData';
//import { filterObj } from './filterData';


export default () => {
  const { ID, VARIATION } = shared;

  setup();

  fireEvent('Conditions Met');

  if (window.usabilla_live){
    window.usabilla_live('trigger', `${ID} V${VARIATION} trigger`);
  }
  
  // -----------------------------
  // Add events that apply to both variant and control
  // @see https://app.gitbook.com/@userconversion/s/development/events/helpers/
  // -----------------------------
  // ...

  // -----------------------------
  // If control, bail out from here
  // -----------------------------
  if(VARIATION == 'control') {
    return;
  }


  // -----------------------------
  // Write experiment code here
  // -----------------------------
  // ...

  const createFilterWrapper = (type) => {
    const heroFilter = document.createElement('div');
    heroFilter.classList.add(`${ID}-heroFilters`);
    heroFilter.innerHTML = `
    <h3>Filter by <span>${type}</span></h3>
    <div class="${ID}-filters"></div>`;

    document.querySelector('#estores_product_listing_widget').insertAdjacentElement('afterbegin', heroFilter);
  }

  const slickFilters = () => {
    window.jQuery(`.${ID}-filters`).slick({
      slidesToShow: 2,
      slidesToScroll: 1,
      draggable: true,
      rows: 0,
      infinite: true,
      nextArrow: `<button class="slide-arrow ${ID}-next"></button>`,
      prevArrow: `<button class="slide-arrow ${ID}-back"></button>`,

      mobileFirst: true,
      responsive: [{
          breakpoint: 9999,
          settings: {
            slidesToShow: 4,
            slidesToScroll: 1,
            dots: false,
          }
        },
        {
          breakpoint: 1024,
          settings: {
            slidesToShow: 4,
            slidesToScroll: 1,
            dots: false,
          }
        },
        {
          breakpoint: 600,
          settings: {
            slidesToShow: 3,
            slidesToScroll: 1,
            dots: false,
          }
        },
        {
          breakpoint: 200,
          settings: "unslick"
        }
      
      ]
    });
  }

  const filterClick = () => {
    const filters = document.querySelectorAll(`.${ID}-topFilter`);
    for (let index = 0; index < filters.length; index += 1) {
      const element = filters[index];
      element.addEventListener('click', (e) => {
        const targetEl = e.currentTarget.getAttribute('filter-target');
        const filterName = e.currentTarget.querySelector('span');

        let matchingEl;
        matchingEl = document.querySelector(`.row.facetContainer a[id^="${targetEl.replace(/'/g, "\\'").replace(/\?/g, "\\?").replace(/&/g, "\\&") }"`);

        matchingEl.click();

        if (filterName) {
          fireEvent('Clicked Hero Filter');
        }
      });
    }
  }

  const checkActiveFilter = () => {
    const filters = document.querySelectorAll(`.${ID}-topFilter`);
    for (let index = 0; index < filters.length; index += 1) {
      const element = filters[index];

      const filterTargets = element.getAttribute('filter-target');
    
      let matchingFilter;
      matchingFilter = document.querySelector(`.row.facetContainer a[id^="${filterTargets.replace(/'/g, "\\'").replace(/\?/g, "\\?").replace(/&/g, "\\&")}"`);
      if (matchingFilter) {
        if (matchingFilter.getAttribute('aria-checked') === 'true') {
          element.classList.add(`${ID}-filterActive`);
        } else {
          element.classList.remove(`${ID}-filterActive`);
        }
      }
    }
  }


  const filterData = filterObj;

 

  const urlReg = window.location.pathname.match(/((\/)(health-pharmacy|beauty|fragrance|baby-child|wellness|toiletries|electrical|mens)(\/)[\w\d-]+)/);


  if (urlReg && urlReg[0]) {
    const urlMatch = filterData[urlReg[0]];

    if(urlMatch) {
      fireEvent('Filters shown');

      // if rating to be shown
      if(urlMatch.rating !== false) {
        createFilterWrapper('rating');
        addReviewFilters();
      }

      // if price to be shown
      if(urlMatch.price !== false) {
        createFilterWrapper('price');
        addPriceFilters();
      
      }

      // if brands to be shown
      if(urlMatch.brands !== false) {
        createFilterWrapper('brand');
        brandFilters(urlMatch);

      }


      // functions for after filters are added

  
        filterClick();  
        checkActiveFilter();
        
        if(window.innerWidth > 767) {
          slickFilters();
          window.jQuery(`.${ID}-filters`).slick('resize');
        }

        window.addEventListener('resize', () => {
          if(window.innerWidth > 767) {
            slickFilters();
            window.jQuery(`.${ID}-filters`).slick('resize');
          }
        })
      
    } else {
      return;
    }
    
  }

};
