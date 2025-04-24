/**
 * ID - Description
 *
 * @fileoverview The main experiment logic goes here. Everything should be written inside the
 * activate function which is called if the conditions in triggers.js have passed evaluation
 * @author User Conversion
 */

import { setup, fireEvent } from '../../../../../core-files/services';
import shared from '../../../../../core-files/shared';
import { addPriceFilters, addReviewFilters, brandFilters, filterObj, addCategoryFilters } from './filterData';

import Swiper from "swiper/swiper-bundle";


export default () => {
  const { ID, VARIATION } = shared;

  setup();

  fireEvent('Conditions Met');
  
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

    document.querySelector('#widget_breadcrumb').insertAdjacentElement('afterend', heroFilter);
  }

  let selectorType;
  if(VARIATION === '1') {
    selectorType = "aria-label";
  } else if(VARIATION === '2') {
    selectorType = "href"; 
  } else if(VARIATION === '3') {
    
  } 
  

  const filterClick = () => {
    const filters = document.querySelectorAll(`.${ID}-topFilter`);
    for (let index = 0; index < filters.length; index += 1) {
      const element = filters[index];
      element.addEventListener('click', (e) => {
        const targetEl = e.currentTarget.getAttribute('filter-target');
        console.log(targetEl);
        let filterName = e.currentTarget.querySelector('span').innerText;
        if(VARIATION === '2') {
          filterName = e.currentTarget.getAttribute('link');
        } 

        let matchingEl;
        matchingEl = document.querySelector(`#productsFacets .${targetEl}[${selectorType}="${filterName}"]`);
        console.log(matchingEl);
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
      const filterName = element.querySelector('span');
    
      let matchingFilter;
      matchingFilter = document.querySelector(`#productsFacets .${filterTargets}[aria-label="${filterName}"]`);
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
  

  const filterData = filterObj;
  //const filterData = window.filterObj;
  const url = window.location.pathname;

  if (url) {
    const urlMatch = filterData[url];

      if(VARIATION === '1') {
        createFilterWrapper('rating');
        document.querySelector(`.${ID}-filters`).classList.add(`${ID}-rating`);
        addReviewFilters();
        if (window.userObject && window.userObject.filterUsage.length > 0){
          fireEvent('Personalised Filters Available');
        }
        fireEvent('Hero Filters Shown');
        filterClick();  
        checkActiveFilter();
        filterCarousel();
      } else if(VARIATION === '2') {
        createFilterWrapper('category');
        document.querySelector(`.${ID}-filters`).classList.add(`${ID}-rating`);
        addCategoryFilters();
        if (window.userObject && window.userObject.filterUsage.length > 0){
          fireEvent('Personalised Filters Available');
        }
        fireEvent('Hero Filters Shown');
        filterClick();  
        checkActiveFilter();
        filterCarousel();
      } else if(VARIATION === '3') {
        createFilterWrapper('price');
        if (window.userObject && window.userObject.filterUsage.length > 0){
          fireEvent('Personalised Filters Available');
        }
        document.querySelector(`.${ID}-filters`).classList.add(`${ID}-price`);
        addPriceFilters();
        fireEvent('Hero Filters Shown');
        filterClick();  
        checkActiveFilter();
        filterCarousel();
      } 

  }

};
