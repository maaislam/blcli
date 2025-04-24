/**
 * BO132 - Specific Hero Filters
 *
 * @fileoverview The main experiment logic goes here. Everything should be written inside the
 * activate function which is called if the conditions in triggers.js have passed evaluation
 * @author User Conversion
 */

import { setup, fireEvent } from '../../../../../core-files/services';
import { pollerLite, observer } from './../../../../../lib/utils';
import shared from '../../../../../core-files/shared';
import { createFilterWrapper, addFilters, filterClick, checkActive, slickFilters } from './helpers';
import getData from './getData';

const activate = () => {
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
  if (!document.querySelector(`.${ID}-heroFilters`)) {
    createFilterWrapper();
    addFilters();
    filterClick();
    checkActive();
    // filterTracking();

    if(window.innerWidth > 767) {
      if(getData().length > 3) {
        slickFilters();
        window.jQuery(`.${ID}-filters`).slick('resize');
      }
    }

  }

  observer.connect(document.querySelector('#progress_bar'), () => {
    let loaderVisibility = document.querySelector('#progress_bar').getAttribute('style');
    if (loaderVisibility.indexOf('none') > -1) {
      pollerLite([
        'body','.product_listing_container .grid_mode li', '.plp_gridView_redesign', '.row.facetContainer', '#price_range_input #price_range_go',
        ], () =>{
          setTimeout(()=> {
              activate();

              checkActive();
          }, 500);
          
    });
    }
  }, {
    throttle: 200,
    config: {
      attributes: true,
      childList: false,
      // subtree: true,
    },
  });

};

export default activate;
