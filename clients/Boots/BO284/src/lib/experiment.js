/**
 * ID - Description
 *
 * @fileoverview The main experiment logic goes here. Everything should be written inside the
 * activate function which is called if the conditions in triggers.js have passed evaluation
 * @author User Conversion
 */

import { setup, fireEvent } from '../../../../../core-files/services';
import shared from '../../../../../core-files/shared';
import { addCategoryFilters, addPriceFilters, addReviewFilters } from './filterData';

import Swiper from 'swiper/swiper-bundle';

const checkActiveProductTypeNodeLength = (type) => {

  let activeNodes = document.querySelector(`.title[aria-label='${type}']`).closest('fieldset').querySelectorAll('li');
  activeNodes = [].slice.call(activeNodes).filter((node) => {

    if (node.style.display === 'none') {
      return false;
    } else {
      return node;
    }

  });

  let activeNodesLength = activeNodes.length;
  return activeNodesLength;

}

export default () => {
  const { ID, VARIATION } = shared;

  setup();

  fireEvent('Conditions Met');

  if (window.usabilla_live) {
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
  if (VARIATION == 'control') {
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
    //document.querySelector('#estores_product_listing_widget').insertAdjacentElement('afterbegin', heroFilter);
  };

  const filterClick = () => {
    const filters = document.querySelectorAll(`.${ID}-topFilter`);
    for (let index = 0; index < filters.length; index += 1) {
      const element = filters[index];
      element.addEventListener('click', (e) => {
        const targetEl = e.currentTarget.getAttribute('filter-target');
        const filterName = e.currentTarget.querySelector('span');

        let matchingEl;
        matchingEl = document.querySelector(
          `.row.facetContainer a[id^="${targetEl.replace(/'/g, "\\'").replace(/\?/g, '\\?').replace(/&/g, '\\&')}"`
        );

        matchingEl.click();

        if (filterName) {
          fireEvent(`Click - Clicked Hero Filter: ${filterName.innerText}`);
        }
      });
    }
  };

  const startPrice = () => {

    createFilterWrapper('price');
    if (window.userObject && window.userObject.filterUsage.length > 0) {
      fireEvent('Personalised Filters Available');
    }
    document.querySelector(`.${ID}-filters`).classList.add(`${ID}-price`);
    addPriceFilters();
    fireEvent('Hero Filters Shown');
    filterClick();
    filterCarousel();

  }

  const startProductType = () => {

    createFilterWrapper('product type');
    document.querySelector(`.${ID}-filters`).classList.add(`${ID}-rating`);
    addCategoryFilters();
    if (window.userObject && window.userObject.filterUsage.length > 0) {
      fireEvent('Personalised Filters Available');
    }
    fireEvent('Hero Filters Shown');
    filterClick();
    filterCarousel();

  }

  const startRating = () => {
    createFilterWrapper('rating');
    document.querySelector(`.${ID}-filters`).classList.add(`${ID}-rating`);
    addReviewFilters();
    if (window.userObject && window.userObject.filterUsage.length > 0) {
      fireEvent('Personalised Filters Available');
    }
    fireEvent('Hero Filters Shown');
    filterClick();
    filterCarousel();
  }

  const filterCarousel = () => {
    new Swiper(`#${ID}-swiper`, {
      slidesPerView: 'auto',
      loop: false,
      spaceBetween: 0,
      slidesOffsetAfter: 0,

      navigation: {
        nextEl: `#${ID}-swiper .swiper-button-next`,
        prevEl: `#${ID}-swiper .swiper-button-prev`,
      }
    });
  };

  const url = window.location.pathname;

  if (url) {

    if (VARIATION === '1') {
      
      setTimeout(() => {
        startRating();
      }, 2000);

      let bodyList = document.querySelector(".title[aria-label='rating']").closest('fieldset');
      let oldHref = document.location.href;
      let initialActiveNodeLength = checkActiveProductTypeNodeLength('rating');
      const observer = new MutationObserver(function (mutations) {
        let newActiveNodeLength = checkActiveProductTypeNodeLength('rating');
        console.log(newActiveNodeLength, initialActiveNodeLength);
        if (newActiveNodeLength !== initialActiveNodeLength) {
          initialActiveNodeLength = newActiveNodeLength;
          setTimeout(() => {
            const filterBlock = document.querySelector(`.${ID}-heroFilters`);
            if (filterBlock) {
              filterBlock.remove();
            }
            startRating();
          }, 1000);
        }

        if (oldHref != document.location.href) {
          oldHref = document.location.href;
          setTimeout(() => {
            const filterBlock = document.querySelector(`.${ID}-heroFilters`);
            if (filterBlock) {
              filterBlock.remove();
            }
            startRating();
          }, 1000);

        }
        

      });
      const config = {
        childList: true,
        subtree: true
      };


      observer.observe(bodyList, config);


    } else if (VARIATION === '2') {
      setTimeout(() => {
        startProductType();
      }, 2000);

      let bodyList = document.querySelector(".title[aria-label='product type']").closest('fieldset');
      let oldHref = document.location.href;
      let initialActiveNodeLength = checkActiveProductTypeNodeLength('product type');
      const observer = new MutationObserver(function (mutations) {
        let newActiveNodeLength = checkActiveProductTypeNodeLength('product type');
        console.log(newActiveNodeLength, initialActiveNodeLength);
        if (newActiveNodeLength !== initialActiveNodeLength) {
          initialActiveNodeLength = newActiveNodeLength;
          setTimeout(() => {
            const filterBlock = document.querySelector(`.${ID}-heroFilters`);
            if (filterBlock) {
              filterBlock.remove();
            }
            startProductType();
          }, 1000);
        }

        if (oldHref != document.location.href) {
          oldHref = document.location.href;
          setTimeout(() => {
            const filterBlock = document.querySelector(`.${ID}-heroFilters`);
            if (filterBlock) {
              filterBlock.remove();
            }
            startProductType();
          }, 1000);

        }
        

      });
      const config = {
        childList: true,
        subtree: true
      };


      observer.observe(bodyList, config);
      

      
    } else if (VARIATION === '3') {
      
      startPrice();

      let oldHref = document.location.href;
      let bodyList = document.querySelector("body");
      const observer = new MutationObserver(function (mutations) {
        mutations.forEach(function (mutation) {
          if (oldHref != document.location.href) {
            oldHref = document.location.href;
            setTimeout(() => {
              const filterBlock = document.querySelector(`.${ID}-heroFilters`);
              if (filterBlock) {
                filterBlock.remove();
              }
              startPrice();
            }, 3000);

          }
        });
      });
      const config = {
        childList: true,
        subtree: true
      };

      observer.observe(bodyList, config);
    }
  }
};
