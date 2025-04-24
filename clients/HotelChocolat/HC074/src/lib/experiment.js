/**
 * HC074 - PLP Tiles
 *
 * @fileoverview The main experiment logic goes here. Everything should be written inside the
 * activate function which is called if the conditions in triggers.js have passed evaluation
 * @author User Conversion
 */

import { setup, fireEvent } from '../../../../../core-files/services';
import { pollerLite } from './../../../../../lib/utils';
import { observer } from '../../../../../lib/uc-lib';
import shared from '../../../../../core-files/shared';
import { generatePlpTileContent, addTileMessage, updateByPageView } from './helpers';
// import { nextDay, isAfterCutoff, arriveBy } from './nextDayDelivery';

export default () => {
  const { ID, VARIATION } = shared;

  setup();

  fireEvent('Conditions Met');

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
  const productList = document.querySelector('.search-result-content ul#search-result-items');
  const allProducts = productList.querySelectorAll('li');
  // --- DESKTOP
  if (window.innerWidth > 767) {
    if (!!allProducts[9]) {
      allProducts[9].insertAdjacentHTML('beforebegin', generatePlpTileContent(productList));
    } else if (!!allProducts[5]) {
      allProducts[5].insertAdjacentHTML('beforebegin', generatePlpTileContent(productList));
    } else {
      productList.insertAdjacentHTML('beforeend', generatePlpTileContent(productList));
    }
  } else {
  // --- MOBILE
    if (!!allProducts[5]) {
      allProducts[5].insertAdjacentHTML('beforebegin', generatePlpTileContent(productList));
    } else {
      productList.insertAdjacentHTML('beforeend', generatePlpTileContent(productList));
    }
  }

  pollerLite([`.${ID}-plp-tile__wrapper.grid-tile`], () => {
    addTileMessage();
    fireEvent('Visible - Next Day Delivery Message Tile');
  });

  observer.connect(document.querySelector('#main #primary .pagination .toggle-grid .grid-view'), () => {
    console.log('SOMETHING HAS CHANGED-------');
    updateByPageView();
  }, {
    throttle: 200,
    config: {
      attributes: true,
      childList: false,
      // subtree: true,
    },
  });

  
};
