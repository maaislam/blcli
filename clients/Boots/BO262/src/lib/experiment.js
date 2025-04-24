/**
 * ID - Description
 *
 * @fileoverview The main experiment logic goes here. Everything should be written inside the
 * activate function which is called if the conditions in triggers.js have passed evaluation
 * @author User Conversion
 */

import { setup, fireEvent, newEvents } from '../../../../../core-files/services';
import shared from '../../../../../core-files/shared';
import { logMessage, pollerLite } from '../../../../../lib/utils';
import { addReviewFilters, filterObj, personalisedFilters } from './filterData';

import Swiper from "swiper/swiper-bundle"

const { ID, VARIATION } = shared;
let filterType;

const createFilterWrapper = (type) => {
  const heroFilter = document.createElement('div');
  heroFilter.classList.add(`${ID}-heroFilters`);
  heroFilter.innerHTML = `
  <h3>Filter by <span>${type.replaceAll('_', ' ')}:</span></h3>
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
        fireEvent(`Click - Clicked ${filterType} filter with name: ${filterName.innerText}`);
      }
    });
  }
}

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

const addPersonalisedFilters = (filterToUse, lastFilterValue) => {
  const allFilters = personalisedFilters(filterToUse);

  // move last filter to top of array
  allFilters.unshift(
    allFilters.splice(
      allFilters.findIndex((item) => item.name === lastFilterValue),
      1
    )[0]
  );

  Object.keys(allFilters).forEach((i) => {
    const data = allFilters[i];
    const filter = document.createElement("div");
    filter.classList.add(`${ID}-topFilter`);
    filter.classList.add("swiper-slide");
    filter.setAttribute("filter-target", data.target);
    filter.innerHTML = `<span>${data.name}</span>`;
    document.querySelector(`.${ID}-filters .swiper-wrapper`).appendChild(filter);
  });
};

const startExperiment = () => {
  
  filterType = '';

  if (window.userObject && window.userObject.filterUsage) {
    // reverse loop through filters until match is found
    const filters = window.userObject.filterUsage;
    const lastFilter = filters[filters.length - 1];
    let filterToUse;
    let lastFilterValue;
    let newFilterObj = filterObj;
    newFilterObj = Object.entries(newFilterObj);
    let currHref = window.location.href;
  

    if(filters.length > 0) {

      let currPageFilters = filters.filter((filter) => {

        if(currHref.indexOf(filter.filterURL) > -1) {
          return true;
        }

      });

      let mostDuplicatedObject = getMostDuplicatedValue(currPageFilters, 2);
      if(!mostDuplicatedObject) {
        filterType = "Last Hero";
        filterToUse = currPageFilters[currPageFilters.length - 1].filterName;
      } else {
        filterType = "Most Popular"
        filterToUse = getMostDuplicatedValue(currPageFilters, 2).filterName;
      }

      

      logMessage("Filters present - filter to use: "+filterToUse);


    } else {

      let newFilterObj = filterObj;

      newFilterObj = Object.entries(newFilterObj);
      
      let theUsedFilter = newFilterObj.filter((filter) => {
        let fullURL = window.location.href;
        if(fullURL.indexOf(filter[0]) > -1) {
          return true;
        } else {
          return false;
        }
      });

      filterType = "Standard Hero";

      logMessage("Nothing found for filter object, so default filter used: ", theUsedFilter[0][1].type)
      filterToUse = theUsedFilter[0][1].type;

    }

    if(VARIATION == 1) {
      if (filterToUse || filterToUse !== '') {

          createFilterWrapper(filterToUse);
          //document.querySelector(`.${ID}-filters`).classList.add(`${ID}-${filterToUse}`);
    
    
          addPersonalisedFilters(filterToUse, lastFilterValue);
          fireEvent(`Interaction - ${filterType} shown - ${filterToUse} filter used`);
          filterClick();
          checkActiveFilter();
          filterCarousel();
        
      }

    } else if(VARIATION == 2) {

      if(filterType == "Most Popular" || filterType == "Last Hero") {

          createFilterWrapper(filterToUse);
          addPersonalisedFilters(filterToUse, lastFilterValue);
          filterClick();
          checkActiveFilter();
          filterCarousel();
        

      } else {

        createFilterWrapper('rating');
        document.querySelector(`.${ID}-filters`).classList.add(`${ID}-rating`);
        addReviewFilters();
        filterClick();  
        checkActiveFilter();
        filterCarousel();

      }

      fireEvent(`Interaction - ${filterType} shown - ${filterToUse} filter used`);
    
    } else if(VARIATION == 3) {

      createFilterWrapper('rating');
      document.querySelector(`.${ID}-filters`).classList.add(`${ID}-rating`);
      addReviewFilters();
      fireEvent('Standard Review Filter Added')
      filterClick();  
      checkActiveFilter();
      filterCarousel();

      if(filterType == "Most Popular" || filterType == "Last Hero") {
        fireEvent(`Interaction - ratings shown - ${filterToUse} filter WOULD have been used as filterType: ${filterType} found`);
      } else {
        fireEvent(`Interaction - ratings shown - no additional filters would have been shown`);
      }

    } else if(VARIATION == "control") {

      if(filterType == "Most Popular" || filterType == "Last Hero") {
        fireEvent(`Interaction - nothing shown as control - ${filterToUse} filter WOULD have been used as filterType: ${filterType} found`);
      } else {
        fireEvent(`Interaction - nothing shown as control - no additional filters would have been shown`);
      }

    }

  }
}

export default () => {
  

  // newEvents.initiate = true;
  // newEvents.methods = ["ga4", "datalayer", "ua"];

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

  let currURL = window.location.href;
  let allURLs = Object.keys(filterObj);
  // find if the page url contains any of the URLs within filterObj
  const findURL = () => {
    let found = false;
    for (let i = 0; i < allURLs.length; i++) {
      if (currURL.includes(allURLs[i])) {
        
        found = true;
        break;
      }
    }
    return found;
  }

  if(findURL() === true) {

    logMessage("Found the URL, displaying experiment");
    pollerLite([() => { return window.userObject; }], () => {
      startExperiment();
    });
    

  } else {

    logMessage('No URL found for this page');

  }

  

  

  

  

};
