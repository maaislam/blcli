import { miniCart, cartPage } from './experiment';
import { pollerLite } from '../../../../lib/uc-lib';

// Minicart poller
pollerLite([
  '#divAddRemoveToBag', // Added to bag message
  '.AddToBagBar .addToBag', // Add to bag button
  '#aBagLink', // Cart icon
], miniCart);


// Cart page poller

pollerLite([
  '#BasketDiv', // Basket container
  '#aBagLink', // Cart icon
  // check for basket empty message, show test if not found
  () => {
    let emptyBasket = false;
    if (!document.querySelector('.AspNet-GridView-Empty')) {
      emptyBasket = true;
    }
    return emptyBasket;
  },
], cartPage);
