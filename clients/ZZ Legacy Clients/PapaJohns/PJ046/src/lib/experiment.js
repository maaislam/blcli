/**
 * PJ046 - Create Your Own Update
 * @author User Conversion
 */
import { setup } from './services';
import { cacheDom } from './../../../../../lib/cache-dom';
import pizzaPage from './components/pizzaPage';
import createTopBanner from './components/createTopBanner';
import updateOrderSummary from './components/updateOrderSummary';
import baseAndSize from './components/baseAndSize';
import cheeseSelection from './components/cheeseSelection';
import toppings from './components/toppings';
import { buildBottomBar } from './components/bottomBar';
import { pollerLite, observer } from '../../../../../lib/uc-lib';
import { getUrlParameter } from '../../../../../lib/utils';
import ingredientChecker from './components/ingredientChecker';
import state from './state';

const activate = () => {
  // setup();
  // -------------------------------------------
  // PRM Manager Listen for State Changes
  // -------------------------------------------
  window.prm.add_endRequest(function (sender, error) {
    try {
      // Give min height to top bar
      if(state.baseChosen) {
        const customiseBox = document.querySelector('.PJ046-topOrderSummary .customiseBox');

        if(customiseBox) {
          customiseBox.classList.add('PJ046-box-should-have-min-height');
        }
      }
      
    } catch (e) {} 
  });

  // -------------------------------------------
  // Run test for pizza page and customise page
  // -------------------------------------------
  const pathname = window.location.pathname;
  if (pathname.match(/\/stores\/(.*)\/pizzas\.aspx/g)) {
    setup();
    pizzaPage();
  } else if (pathname.match(/\/stores\/(.*)\/customise\.aspx/g)) {
    if (getUrlParameter('pj') === 'cyo') {
      setup();
      createTopBanner();
      updateOrderSummary();

      // -------------------------------------------
      // Listen for changes and update order summary accordingly
      // -------------------------------------------
      observer.connect([document.querySelector('#ctl00_cphBody__objCustomise_upCustomise'), document.querySelector('select#ctl00_cphBody__objCustomise_ddlVariations')], () => {
        updateOrderSummary();
      }, {
        throttle: 200,
        config: {
          attributes: false,
          childList: true,
        },
      });

      // -------------------------------------------
      // Build Base and Size Section
      // -------------------------------------------
      baseAndSize();
      
      // -------------------------------------------
      // Build Cheese Selection
      // -------------------------------------------
      cheeseSelection();

      // -------------------------------------------
      // Build Toppings and bottom bar
      //
      // At this point we can event track
      // -------------------------------------------
      pollerLite(['.PJ046-toppings_section', '.PJ046-toppings_categories', '.PJ046-topping_category', '.PJ046-toppings'], () => {
        // Build toppings
        toppings();

        // Build bottom bar
        const price = document.querySelector('.PJ046-cyo__details-price');
        buildBottomBar(price ? price.innerText.trim() : null);
      });
    }
  }
};

export default activate;
