/**
 * PC-217 - Suggested filter prompt
 *
 * @fileoverview The main experiment logic goes here. Everything should be written inside the
 * activate function which is called if the conditions in triggers.js have passed evaluation
 * @author User Conversion
 */
import { setup, fireEvent } from '../../../../../core-files/services';
import shared from '../../../../../core-files/shared';
import { getUrlParameter, getPopularSizeFilters, addSizeFiltersIDs, generatePopularFilterSizes, clickEvents } from './helpers';
import data from './data';

const { ID, VARIATION, CLIENT, LIVECODE } = shared;

export default () => {

  setup();

  if (!document.querySelector(`body.${ID}-ga-tracking-added`)) {
    fireEvent('Conditions Met');
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
  
  
  // document.querySelector('.template-category-list').insertAdjacentHTML('afterbegin', `<div class="${ID}-popular-filter-sizes__wrapper"><div class="${ID}-popular-filter-sizes__container"><ul class="${ID}-popular-sizes__content mobile"><span>What <strong>Size</strong> are you looking for?</span></br><span>Select all that apply:</span></ul></div></div>`);

  if (!document.querySelector(`.${ID}-popular-filter-sizes__wrapper`)) {
    document.querySelector('.template-category-list').insertAdjacentHTML('afterbegin', `<div class="${ID}-popular-filter-sizes__wrapper"><div class="${ID}-popular-filter-sizes__container"><div class="${ID}-header"><span class="bold">What <strong>Size</strong> are you looking for?</span></br><span>Select all that apply:</span></div><ul class="${ID}-popular-sizes__content desktop v${VARIATION}"></ul></div></div>`);
    generatePopularFilterSizes(window.location.pathname);
  }
  

  if (getUrlParameter('filter_products') !== null
  && getUrlParameter('filter_products') !== '') {
    let popularSizes = getPopularSizeFilters(window.location.pathname);
    setTimeout(() => {
      addSizeFiltersIDs(popularSizes);
    }, 500);
    
  }

  if (!document.querySelector(`body.${ID}-ga-tracking-added`)) {
    clickEvents();
  }

};
