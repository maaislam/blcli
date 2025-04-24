import { pollerLite } from '../../../../lib/uc-lib';
import activate from './lib/experiment';

// Prevent test duplication
if (!document.body.classList.contains('TP146d')) {
  pollerLite([
    '#ProductDetail .tpProductInfo', // Product Detail Container
    'div#tab-techspecs tbody > tr > td:last-child', // Brick height
    'div#tab-techspecs tbody tr .attrib', // Pack quantites
    '#qty', // Quantity input
    '#addToCartButton', // Add to bag button
    '.noStockErrorMsg', // No stock error message - Always exists check visibility
    '.moqErrorMsg', // Quantity error message
    () => !![].filter.call(document.querySelectorAll('.attrib'), el => el.innerText.trim().toUpperCase() === 'WIDTH').length,
    () => {
      const lengthDropdownLabel = [].filter.call(document.querySelectorAll('.tpVariantsWrapper label'), el => el.innerText.trim().toLowerCase() === 'length:')[0];
      const lengthInTechSpecsLabel = [].filter.call(document.querySelectorAll('.attrib'), el => el.innerText.trim().toLowerCase() === 'length')[0];
      return lengthDropdownLabel || lengthInTechSpecsLabel;
    },
  ], activate);
}
