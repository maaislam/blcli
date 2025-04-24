import Run from './experiment';
import { pollerLite } from '../../../../lib/uc-lib';

// Prevent test duplication
if (!document.body.classList.contains('TP131')) {
  pollerLite([
    '#ProductDetail .tpProductInfo', // Product Detail Container
    'div#tab-techspecs tbody > tr > td:last-child', // Brick height
    'div#tab-techspecs tbody tr .attrib', // Pack quantites
    '#qty', // Quantity input
    '#addToCartButton', // Add to bag button
    '.noStockErrorMsg', // No stock error message - Always exists check visibility
    '.moqErrorMsg', // Quantity error message

    // Loop through every tech spec to find pack quantity
    () => {
      let packQuantity = false;
      const allSpecs = document.querySelectorAll('div#tab-techspecs tbody tr');
      for (let i = 0, n = allSpecs.length; i < n; i += 1) {
        const currentSpec = allSpecs[i].querySelector('.attrib');
        if (currentSpec.textContent.toUpperCase().trim() === 'PACK QUANTITY') {
          packQuantity = true;
          break;
        }
      }
      return packQuantity;
    },
    () => {
      let checkjQuery = false;
      if (window.jQuery) {
        checkjQuery = true;
      }
      return checkjQuery;
    },
  ], Run);
}
