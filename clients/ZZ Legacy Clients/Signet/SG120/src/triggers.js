/**
 * @fileoverview The triggers file contains all activation conditions for the experiment.
 * This is the first file to be evaluated.
 */
import activate from './lib/experiment';
import { pollerLite } from '../../../../lib/uc-lib';

pollerLite([
  'body', '.product-summary .product-price-offer',
  () => {
    if(window.digitalData.page.pageInfo.pageType && window.digitalData.page.pageInfo.pageType === 'PDP') {
      return true;
    }
  },
  () => {
    if(document.querySelector('.product-summary .product-price-offer')) {
      if(document.querySelector('.product-summary .product-price-offer').textContent.indexOf('Silver Diamond Double Heart') > -1) {
        return true;
      }
    }
  }
], activate);
