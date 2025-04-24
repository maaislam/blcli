/**
 * FLAN-393 one-size basket recommentatinons with ATB
 *
 * @fileoverview The main experiment logic goes here. Everything should be written inside the
 * activate function which is called if the conditions in triggers.js have passed evaluation
 * @author User Conversion
 */
import { setup, fireEvent } from '../../../../../core-files/services';
import shared from '../../../../../core-files/shared';
import { events, logMessage, pollerLite } from '../../../../../lib/utils';
import { displayCarousel } from './display-carousel.function';
import { getProductData } from './get-product-data.function';

// Force set analytics reference
events.analyticsReference = '_gaUAT';

const { ID, VARIATION } = shared;

const getPageData = () => {
  let dataObject;
  for (let i = 0; i < window.dataLayer.length; i += 1) {
    const data = window.dataLayer[i];
    if (
      typeof data === 'object' &&
      data.event &&
      data.event === 'FLAN_onLoad'
    ) {
      dataObject = data;
      break;
    }
  }
  return dataObject;
};

export default () => {
  setup();

  logMessage(ID + ' Variation: ' + VARIATION);

  fireEvent('Conditions Met');

  // -----------------------------
  // If control, bail out from here
  // -----------------------------
  if (shared.VARIATION == 'control') return;

  // Write experiment code here
  // ...
  pollerLite(
    [
      () => {
        if (typeof getPageData() !== 'undefined') {
          return true;
        }
      },
    ],
    () => {
      const pageData = getPageData();

      if (pageData.transactionPurchaseQuantity > 0) {
        displayCarousel();

        getProductData();
      } else {
        const noBasketItemsMessage = 'FLAN-393: No items in basket';
        logMessage(noBasketItemsMessage);
        fireEvent(noBasketItemsMessage);
      }
    }
  );
};
