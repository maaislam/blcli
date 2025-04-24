import Run from './experiment';
import { pollerLite } from '../../../../lib/uc-lib';

if (!document.body.classList.contains('TP133m')) {
  pollerLite([
    '.advanced_plp_product_item', // Product container
    '#addForCollection', // Add for collection buttons
    '#addToCartButton', // Add to cart buttons
    () => {
      let checkjQuery = false;
      if (window.jQuery) {
        checkjQuery = true;
      }
      return checkjQuery;
    },
    () => {
      // Check there are at least 7 products on the page
      let checkLength = false;
      let productCount = document.querySelectorAll('.advanced_plp_product_item');
      productCount = productCount.length;
      if (productCount >= 7) {
        checkLength = true;
      }
      return checkLength;
    },
  ], Run);
}
