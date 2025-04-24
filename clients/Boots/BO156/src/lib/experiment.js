/**
 * ID - Description
 *
 * @fileoverview The main experiment logic goes here. Everything should be written inside the
 * activate function which is called if the conditions in triggers.js have passed evaluation
 * @author User Conversion
 */

import { setup, fireEvent } from '../../../../../core-files/services';
import { pollerLite } from './../../../../../lib/utils';
import shared from '../../../../../core-files/shared';

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
  

  // -----------------------------
  // Write experiment code here
  // -----------------------------
  // ...

  const filterTracking = () => {
    const allFilters = document.querySelectorAll('#productsFacets .facetSelect .facetbutton');
    for (let index = 0; index < allFilters.length; index += 1) {
      const element = allFilters[index];
      element.addEventListener('click', (e) => {
        const filterName = e.currentTarget.getAttribute('name');
        if(filterName) {
          fireEvent('Clicked Filter ' + filterName);
        }
      });
    }
  }


  // hide filter function
    const hideFilter = (filter) => {
      const matching = document.querySelector(`#productsFacets fieldset[id='${filter}']`);
      return matching.classList.add(`${ID}-filterHidden`);
    }


    const filterMap = {
        'body area': [
            /shop-all-liz-earle/,
            /cetaphil-shop-all/,
            /all-luxury-skincare/,
            /skincare-all-skincare/,
            /clinique-full-range/,
            /moisturiser/,
            /all-la-roche-posay-products/,
        ],
        'format': [
          /all-painrelief/,
          /blusher/,
          /multivitamins/,
          /eye-liner/,
          /vitamin-D/,
          /foundation/,
          /cannabidiol-cbd-oil/,
          /baby-child-vitamins/,
          /moisturiser/,
          /cleanser-toner/,
        ],
        'foundation coverage': [
          /foundation/,
        ],
        'finish': [
          /foundation/,
          /lipsticks/,
          /eye-shadow/,
          /lips/,
          /nail-polish/,
          /eye-palettes/,
          /powder/,
          /all-essie-products/,
        ],
        
        'key features': [
          /no7-online-only/,
          /car-seats-accessories/,
          /no7-make-up/,
          /moisturiser/,
          /fitbit-versa/,
          /soap-and-glory-skincare/,
          /mascara/,
        ],
        
      
    }

    // Loop through map and get all matching filters based on the url
    Object.keys(filterMap).forEach(grouping => {
      filterMap[grouping].forEach(condition => {
            let check  = false;

            if(typeof condition == 'function') {
                    check = condition();
                } 
                else {
                    check = location.href.toLowerCase().match(condition);
                }
            
                if(check) {
                  fireEvent('Test Fired, matching filter', true);
                  if(VARIATION === '1') {
                    hideFilter(grouping);
                  }
                }
        });
    });

      filterTracking();


};
