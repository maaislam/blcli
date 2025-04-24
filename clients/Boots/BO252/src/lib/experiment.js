/**
 * ID - Description
 *
 * @fileoverview The main experiment logic goes here. Everything should be written inside the
 * activate function which is called if the conditions in triggers.js have passed evaluation
 * @author User Conversion
 */

import { setup, fireEvent } from '../../../../../core-files/services';
import shared from '../../../../../core-files/shared';
import { addPriceFilters, addReviewFilters, brandFilters, filterObj, personalisedFilters } from './filterData';

import Swiper from "swiper/swiper-bundle"


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
    <h3>Filter by <span>${type}:</span></h3>
    <div class="${ID}-filters">
      <div class="swiper" id="${ID}-swiper">
      <div class="swiper-wrapper"></div>
      <div class="swiper-button-prev"></div>
      <div class="swiper-button-next"></div>
      </div>
    </div>`;

    document.querySelector('#estores_product_listing_widget').insertAdjacentElement('afterbegin', heroFilter);
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

  const filterCarousel = () => {
    new Swiper(`#${ID}-swiper`, {
      slidesPerView: 2,
    loop: false,
    //slidesPerGroup: 1,
    spaceBetween: 10,
    //centerInsufficientSlides: true,
   
    navigation: {
      nextEl: `#${ID}-swiper .swiper-button-next`,
      prevEl: `#${ID}-swiper .swiper-button-prev`,
    },
    breakpoints: {
      320: {
        slidesPerView: "auto",
        //slidesPerGroup: 1,
        spaceBetween: 10,
      },
      540: {
        slidesPerView: "auto",
        //slidesPerGroup: 2,
        spaceBetween: 10,
      },
      760: {
        slidesPerView: "auto",
        //slidesPerGroup: 3,
        spaceBetween: 10,
      },
      1020: {
        slidesPerView: "auto",
        //slidesPerGroup: 4,
        spaceBetween: 10,
      },
      1200: {
        slidesPerView: "auto",
        //slidesPerGroup: 4,
        spaceBetween: 15,
      },
      },
    });
  }


  if(VARIATION === 'control') {
      createFilterWrapper('rating');
      document.querySelector(`.${ID}-filters`).classList.add(`${ID}-rating`);
      addReviewFilters();
      filterClick();  
      checkActiveFilter();
      filterCarousel();
    // } else if(VARIATION === '3') {
    //   createFilterWrapper('price');
    //   document.querySelector(`.${ID}-filters`).classList.add(`${ID}-price`);
    //   addPriceFilters();
    //   filterClick();  
    //   checkActiveFilter();
    //   filterCarousel();
    // }
  } else {
    if (window.userObject && window.userObject.filterUsage) {
      // reverse loop through filters until match is found
      const filters = window.userObject.filterUsage;
      const lastFilter = filters[filters.length - 1];

      let filterToUse;
      let lastFilterValue;

      if(VARIATION === '1') {
        for (var i = filters.length - 1; i >= 0; i--) {
          if (document.getElementById(lastFilter.filterName)) {
            filterToUse = lastFilter.filterName;
            lastFilterValue = lastFilter.filterValue;
            break;
          }
        }
      }

      if(VARIATION === '2') {
        const getMostDuplicatedValue = (arr, minCount)=> {
          let count = {};
          let mostDuplicatedObject;
          let highestCount = 0;
          
          for (let i = 0; i < arr.length; i++) {
            if (count[arr[i].filterName]) {
              count[arr[i].filterName]++;
            } else {
              count[arr[i].filterName] = 1;
            }
            if (count[arr[i].filterName] >= minCount && count[arr[i].filterName] > highestCount) {
              highestCount = count[arr[i].filterName];
              mostDuplicatedObject = arr[i];
            }
          }
          
          return mostDuplicatedObject || null;
        }

        const mostDuplicatedObject = getMostDuplicatedValue(filters, 2);
        if(!mostDuplicatedObject) {
          return;
        } else {
          filterToUse = mostDuplicatedObject.filterName;
          lastFilterValue = mostDuplicatedObject.filterValue;
        }
      }

    
      if (filterToUse || filterToUse !== '') {
        createFilterWrapper(filterToUse);
        //document.querySelector(`.${ID}-filters`).classList.add(`${ID}-${filterToUse}`);

        const addPersonalisedFilters = () => {
          const allFilters = personalisedFilters(filterToUse);

          console.log(allFilters);

          // move last filter to top of array
          allFilters.unshift(
            allFilters.splice(
              allFilters.findIndex((item) => item.name === lastFilterValue),
              1
            )[0]
          );

          console.log(allFilters);

          Object.keys(allFilters).forEach((i) => {
            const data = allFilters[i];
            console.log(data);
            const filter = document.createElement("div");
            filter.classList.add(`${ID}-topFilter`);
            filter.classList.add("swiper-slide");
            filter.setAttribute("filter-target", data.target);
            filter.innerHTML = `<span>${data.name}</span>`;
            document.querySelector(`.${ID}-filters .swiper-wrapper`).appendChild(filter);
          });
        };

        addPersonalisedFilters();
        fireEvent(`Personalised Filter Shown`);
        filterClick();
        checkActiveFilter();
        filterCarousel();
      }
    }
  }

};
