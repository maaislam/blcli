import Run from './experiment';
import { pollerLite } from '../../../../lib/uc-lib';

if (!document.body.classList.contains('TP133d')) {
  pollerLite([
    '#products .prod ', // Product container
    '.list_button', // List view buttons
    '#addToCartButton', // Add to bag buttons
    '#addForCollectButton', // Add to collection button
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
      let productCount = document.querySelectorAll('#products .prod ');
      productCount = productCount.length;
      if (productCount >= 7) {
        checkLength = true;
      }
      return checkLength;
    },
  ], Run);
}
