import { pollerLite } from '../../../../lib/uc-lib';
import activate from './lib/experiment';
import shared from './lib/shared';

// Prevent test duplication
if (!document.body.classList.contains('TP148d')) {
  pollerLite([
    '#ProductDetail .tpProductInfo', // Product Detail Container
    'div#tab-techspecs tbody > tr > td:last-child', // Brick height
    'div#tab-techspecs tbody tr .attrib', // Pack quantites
    '#qty', // Quantity input
    '#addToCartButton', // Add to bag button
    '.noStockErrorMsg', // No stock error message - Always exists check visibility
    '.moqErrorMsg', // Quantity error message
    () => {
      let hasWidth;
      let hasLength;
      let hasCoverage;
      let passed;
      const techSpecs = document.querySelectorAll('.attrib');

      for (let i = 0; i < techSpecs.length; i += 1) {
        const name = techSpecs[i].innerText.trim().toLowerCase();
        switch (name) {
          case 'width':
            hasWidth = true;
            break;

          case 'length':
            hasLength = true;
            break;

          case 'pack coverage':
          case 'coverage':
            hasCoverage = true;
            break;

          default:
            break;
        }
      }

      if (hasWidth && hasLength) {
        shared.productType = 'single';
        passed = true;
      } else if (hasCoverage) {
        shared.productType = 'pack';
        passed = true;
      }

      return passed;
    },
  ], activate);
}
