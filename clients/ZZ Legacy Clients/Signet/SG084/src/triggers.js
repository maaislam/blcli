/**
 * @fileoverview The triggers file contains all activation conditions for the experiment.
 * This is the first file to be evaluated.
 */
import activate from './lib/experiment';
import { pollerLite } from '../../../../lib/uc-lib';

pollerLite([
  'body','#two-column-mode','.product-tile-list .product-tile-list__item','.browse__total-result-container','.cta.js-modal-trigger.filter-toggle','.product-tile__image.lazy',
  () => {
    if(window.digitalData.page.pageInfo.pageType === 'PLP') {
      return true;
    }
  },
  () => {
    if(window.digitalData.page.category.primaryCategory === 'Jewellery' || window.digitalData.page.category.primaryCategory === 'Watches') {
      return true;
    }
  },
], activate);
