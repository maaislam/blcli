import run from './experiment';
import { pollerLite } from '../../../../lib/uc-lib';
import flicker from './flickerprevention';


flicker();
pollerLite([
  '.BasketWishContainer .addToBasketContainer .addToBag',
  () => {
    let checkjQuery = false;
    if (window.jQuery) {
      checkjQuery = true;
    }
    return checkjQuery;
  },
], run);
