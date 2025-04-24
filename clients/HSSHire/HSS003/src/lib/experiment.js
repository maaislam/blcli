/**
 * HSS003 - Account Registration Promotion (Trade) | Mobile
 *
 * @fileoverview The main experiment logic goes here. Everything should be written inside the
 * activate function which is called if the conditions in triggers.js have passed evaluation
 * @author User Conversion
 */
import { setup, generateContainer } from './services';
import shared from './shared';
import { pollerLite, observer } from '../../../../../lib/uc-lib';
import { events } from '../../../../../lib/utils';

const { ID, VARIATION } = shared;

export default () => {
  if (shared.VARIATION == 'control') {
    events.send(`${shared.ID}-control`, 'activated');
  } else {
    // rest of experiment code
    events.send(`${shared.ID}-v1`, 'activated');
    setup();

    // Write experiment code here
    if (window.location.pathname.indexOf('/c/') > -1) {
      // ---  higher level PLP 
      pollerLite(['.home_toplevel_pg.hire_category .row div.col-md-8.col-md-pull-4'], () => {
        if (!document.querySelector(`.${shared.ID}-promotion__wrapper`)) {
          const mainContent = document.querySelector('.home_toplevel_pg.hire_category .row div.col-md-8.col-md-pull-4');
          mainContent.classList.add(`${shared.ID}-mainContent`);
          const secondItem = mainContent.querySelectorAll('.col-sm-6')[1];
          generateContainer(secondItem);
        }
      });


      // ---  lower level PLP 
      pollerLite(['.product_listing_inner.product_list_section'], () => {
        if (!document.querySelector(`.${shared.ID}-promotion__wrapper`)) {
          const mainContent = document.querySelector('.product_listing_inner.product_list_section');
          mainContent.classList.add(`${shared.ID}-mainContent`);
          const prodListOuters = mainContent.querySelectorAll('.col-lg-4.col-md-4.col-sm-4.col-xs-6.prod_list_outer');

          if(prodListOuters.length == 1) {
            generateContainer(prodListOuters[0]);
          } else if(prodListOuters.length >= 2) {
            generateContainer(prodListOuters[1]);
          }
        }
      });
    }
  }

  
};
