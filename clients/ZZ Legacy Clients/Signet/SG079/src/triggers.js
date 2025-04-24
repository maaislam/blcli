/**
 * @fileoverview The triggers file contains all activation conditions for the experiment.
 * This is the first file to be evaluated.
 */
import activate from './lib/experiment';
import { pollerLite } from '../../../../lib/uc-lib';

pollerLite([
  'body','#two-column-mode','.product-tile-list .product-tile-list__item',
  () => {
    if(window.digitalData.page.category.subCategory1 && window.digitalData.page.category.subCategory1 === 'Rings'){
      return true;
    }
  },
], activate);
