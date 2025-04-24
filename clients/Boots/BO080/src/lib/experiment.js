/**
 * BO080 - Filters - Fragrance - Reduction
 *
 * @fileoverview The main experiment logic goes here. Everything should be written inside the
 * activate function which is called if the conditions in triggers.js have passed evaluation
 * @author User Conversion
 */

import { cookieOpt, setup, resetFilters } from './services';
import { events, pollerLite } from '../../../../../lib/utils';
import shared from './shared';
import stickyNav from './sticky-nav';

export default () => {
  const { ID, VARIATION } = shared;

  if (VARIATION == 'control') {
    window.cmCreateManualLinkClickTag("/BO080?cm_sp=MaxymiserEventBO080-_-BO080control-_-BO080Started");

    const allFilters = document.querySelectorAll('#productsFacets fieldset');
    [].forEach.call(allFilters, (filter) => {
      const filterID = filter.getAttribute('id');
       // --- Send tracking event on click
       filter.addEventListener('click', () => {
        window.cmCreateManualLinkClickTag(`/BO080?cm_sp=MaxymiserEventBO080-_-BO080control-_-Clicked[${filterID}]`);
        events.send(`${ID} - Control`, 'Clicked Filter', `${filterID}`, { sendOnce: true });
      });
    });
  } else if (VARIATION == '1') {
    setup();
    cookieOpt();

    if (window.usabilla_live){
      window.usabilla_live('trigger', `${ID} V${VARIATION} trigger`);
    }

    /*  ----------------
      Experiment code 
    ------------------ */
    window.cmCreateManualLinkClickTag("/BO080?cm_sp=MaxymiserEventBO080-_-BO080v1-_-BO080Started");
    
    let filtersToShow = [];
    const allFilters = document.querySelectorAll('#productsFacets fieldset');

    if (window.location.pathname == "/beauty/makeup/face/foundation") {
      filtersToShow = ['brand', 'foundation coverage', 'finish', 'rating'];
      resetFilters(allFilters, filtersToShow);
    } else if (window.location.pathname == "/liz-earle-/shop-all-liz-earle") {
      filtersToShow = ['body area', 'Promotion', 'product type'];
      resetFilters(allFilters, filtersToShow);
    } else if (window.location.pathname == "/beauty/luxury-beauty-skincare/new-in-luxury") {
      filtersToShow = ['Promotion', 'brand', 'rating'];
      resetFilters(allFilters, filtersToShow);
    } else if (window.location.pathname == "/health-pharmacy/medicines-treatments/painrelief/all-painrelief") {
      filtersToShow = ['format', 'product type', 'brand', 'active ingredient'];
      resetFilters(allFilters, filtersToShow);
    } else if (window.location.pathname == "/no7/no7-new") {
      filtersToShow = ['product type'];
      resetFilters(allFilters, filtersToShow);
    } else if (window.location.pathname == "/fragrance/perfume/all-perfume") {
      filtersToShow = ['Promotion', 'fragrance scent', 'brand', 'gender', 'fragrance type', 'rating'];
      resetFilters(allFilters, filtersToShow);
    }


    // const contentDiv = document.querySelector('#content');
    // const contentHeight = contentDiv.clientHeight;
    // const contentTop = contentDiv.offsetTop;

    // const footerOffset = contentHeight + contentTop;

    // // --------------------------------------------------------------
    // // Init sticky nav
    // // --------------------------------------------------------------
    // stickyNav(document.querySelector('#leftHandNav'), 'BO080-', footerOffset, () => {
    //   // events.send(settings.ID, 'sticky-nav-did-stick', window.location.pathname, {
    //   //   sendOnce: true,
    //   // });
    // });

  }

};
