/**
 * ID - Description
 *
 * @fileoverview The main experiment logic goes here. Everything should be written inside the
 * activate function which is called if the conditions in triggers.js have passed evaluation
 * @author User Conversion
 */
import { setup, fireEvent } from '../../../../../core-files/services';
import shared from '../../../../../core-files/shared';

import renderGiftMessage from './components/giftmessage';
import { localStorageSave, localStorageGet } from './helper/cookie';
import observeDOM from './helper/domObserver';

const { ID, VARIATION, CLIENT, LIVECODE } = shared;

export default () => {
  setup();

  fireEvent('Test Code Fired');

  // -----------------------------
  // Add events that apply to both variant and control
  // @see https://app.gitbook.com/@userconversion/s/development/events/helpers/
  // -----------------------------
  // ...

  // const channel = new BroadcastChannel('session');
  // const channel2 = new BroadcastChannel('newtab');
  const giftingIntent = () => {
    const fullUrlPath = location.pathname + location.search;
    const urlHasGift = fullUrlPath.indexOf('gift') !== -1;

    //console.log(urlHasGift);
    if (!urlHasGift) {
      return;
    }

    // sessionStorage.setItem('hasGiftingIntent', 'true');
    localStorageSave('hasGiftingIntent', true);
  };

  const isPdp = () => !!document.querySelector('[class^="ProductSummary_"]');

  document.body.addEventListener('click', (e) => {
    if (e.target.matches('[data-testid="wishlist-add-button"]') || e.target.closest('[data-testid="wishlist-add-button"]')) {
      isPdp() && fireEvent('User clicked wishlist heart / button on PDP');
    }
  });
  // -----------------------------
  // If control, bail out from here
  // -----------------------------
  if (VARIATION == 'control') {
    giftingIntent();
    const callback = (mutations) => {
      const addToBasketBtn = document.querySelector(`[data-testid="add-to-bag"]`);
      giftingIntent();
      if (localStorageGet('hasGiftingIntent') == 'true' && isPdp()) {
        if (addToBasketBtn) {
          fireEvent('conditions met');
          //fireEvent('add to basket button visibile');
        }
        //fireEvent('user has visited a PDP after showing gifting intent', false);
      }
    };

    observeDOM('#gatsby-focus-wrapper', callback);
    return;
  }

  // -----------------------------
  // Write experiment code here
  // -----------------------------
  // ...

  const timer = setInterval(() => {
    if (location.pathname.indexOf('gift') !== -1 && !localStorageGet('hasGiftingIntent')) {
      giftingIntent();
    } else {
      clearInterval(timer);
    }
  }, 25);

  const init = () => {
    giftingIntent();
    const giftIntent = localStorageGet('hasGiftingIntent');
    if (giftIntent == 'true' && isPdp()) {
      setTimeout(() => {
        renderGiftMessage(ID);
        fireEvent('conditions met');
      }, 2000);
    }
  };
  init();

  let oldHref = location.href;

  const callbackFn = (mutations) => {
    const currentHref = location.href;

    // detect if mutation is in product availability container

    if (oldHref !== currentHref || location.pathname.indexOf('gift') !== -1) {
      oldHref = currentHref;
      init();
    }
  };

  observeDOM('#gatsby-focus-wrapper', callbackFn);
};
