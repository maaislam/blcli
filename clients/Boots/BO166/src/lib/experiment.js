/**
 * ID - Description
 *
 * @fileoverview The main experiment logic goes here. Everything should be written inside the
 * activate function which is called if the conditions in triggers.js have passed evaluation
 * @author User Conversion
 */

import { setup, fireEvent } from '../../../../../core-files/services';
import shared from '../../../../../core-files/shared';
import addInGrid from './components/inGrid/addInGrid';
import filterBar from './components/filters/filterBar';
import heroFilters from './components/filters/heroFilters';
import addOffer from './components/offers/addOffer';
import inGridPriceFilter from './components/filters/inGridPriceFilter';

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
  const filterTracking = () => {
    const allFilters = document.querySelectorAll('#productsFacets .facetSelect .facetbutton');
    for (let index = 0; index < allFilters.length; index += 1) {
      const element = allFilters[index];
      element.addEventListener('click', (e) => {
        const filterName = e.currentTarget.getAttribute('name');
        if(filterName) {
         fireEvent('Clicked filter');
        }
      });
    }
  }

  if(VARIATION == 'control') {
    filterTracking();
  } else {

    // -----------------------------
    // Write experiment code here
    // -----------------------------
    // ...

    addOffer(); 
    addInGrid();

    // Top filters
    if(VARIATION === '1' || VARIATION === '2') {
      filterBar();
    }

    // Hero filters
    if(document.querySelector('#rating')) {
      heroFilters();
    }

    // Full width price
    if(VARIATION === '3') {
    inGridPriceFilter();
    }

    filterTracking();
  }

};
