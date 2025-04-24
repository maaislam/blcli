/**
 * BO083 - Mobile Filter Improvements
 *
 * @fileoverview The main experiment logic goes here. Everything should be written inside the
 * activate function which is called if the conditions in triggers.js have passed evaluation
 * @author User Conversion
 */

import { cookieOpt, setup, clickEventsOnFilters } from './services';
import shared from './shared';

export default () => {
  const { ID, VARIATION } = shared;

  if (window.usabilla_live){
    window.usabilla_live('trigger', `${ID} V${VARIATION} trigger`);
  }

  /*  ----------------
    Experiment code 
    ------------------ */
  if (VARIATION == 'control') {
    setup();
    clickEventsOnFilters();
    cookieOpt();
  } else {
    setup();
    cookieOpt();

    clickEventsOnFilters();

    if (VARIATION == '2') {
      document.querySelector('.mobile_facet_controls.select_filter').insertAdjacentHTML('beforebegin', `<div class="${ID}-filterBtn__wrapper"></div>`)
      document.querySelector(`.${ID}-filterBtn__wrapper`).insertAdjacentElement('afterbegin', document.querySelector('.mobile_facet_controls.select_filter'));
      
      const detectScrolling = () => {
        const topFiltersContainerY = document.querySelector('.sorting_view_controls_container').getBoundingClientRect().y;
        const paginationContainerY = document.querySelector('.pageControlMenu').getBoundingClientRect().y;

        if (topFiltersContainerY < 0
        && paginationContainerY >= 0) {
          document.querySelector(`.${ID}-filterBtn__wrapper`).classList.add('sticky');
        } else {
          document.querySelector(`.${ID}-filterBtn__wrapper`).classList.remove('sticky');
        }
      };

      window.addEventListener("scroll", detectScrolling , true);
    
      detectScrolling();
    }
  }

};
